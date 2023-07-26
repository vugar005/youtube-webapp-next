import styles from './search-box.module.scss';
import { Search } from "@mui/icons-material";
import TextField from "@mui/material/TextField";
import { useEffect, useRef, useState } from 'react';
import { useSearchList } from '../../hooks/useSearchList';
import { Subject, from } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';
import Autocomplete from '@mui/material/Autocomplete';
import { useRouter } from 'next/router';
import { IYoutubeSearchItem } from '../../models/youtube-search-list.model';

interface Props {
    debouncePeriod?: number;
    placeholder?: string;
}
export default function SearchBox(props: Props) {
    const router = useRouter();
    const { placeholder, debouncePeriod = 300 } = props;
    const [inputValue, setInputValue] = useState('');
    const [options, setOptions] = useState<string[]>([]);
    const [value, setValue] = useState<string | null>('');
    const { fetchSeachItems, searchItems, isSearchItemsLoading } = useSearchList();
    const optionSelected$ = useRef(new Subject<string>());

    useEffect(() => {
        const sub = optionSelected$.current
            .pipe(
                debounceTime(debouncePeriod),
                switchMap((val) => from(fetchSeachItems({ query: val })))
            )
            .subscribe((data: IYoutubeSearchItem[]) => {
                const items = data?.map((item) => item.snippet?.title) || [];
                setOptions(items);
            });

        return () => sub?.unsubscribe();
    }, [fetchSeachItems, debouncePeriod]);

    useEffect(() => {
        optionSelected$.current.next(inputValue);
    }, [inputValue]);

    useEffect(() => {
        if (!value) { return; }
        const selectedItem = searchItems?.find(item => item.snippet?.title === value);
        if (!selectedItem?.id?.videoId) {
            return;
        }
        router.push(`/watch?v=${selectedItem?.id?.videoId}`);
    }, [value, searchItems, router ]);

    const handleKeyUp = (event: React.KeyboardEvent): void => {
        if(event.key?.toUpperCase() === 'ENTER') {
            console.log('en');
        }
    };

    return (
        <div className={styles.host}>
            <div className={styles.searchboxWrapper}>
                <div className={styles.searchboxField}>
                    <Autocomplete
                        freeSolo
                        options={options}
                        value={value}
                        loading={isSearchItemsLoading}
                        filterOptions={(x) => x}
                        sx={{ height: '100%', fontSize: '1.4rem' }}
                        onChange={(event: any, newValue: string | null) => {
                            setValue(newValue);
                        }}
                        inputValue={inputValue}
                        onInputChange={(event, newInputValue) => {
                            setInputValue(newInputValue);
                        }}
                        renderInput={(params) =>
                            <TextField {...params} onKeyUp={handleKeyUp}  label={placeholder} />}
                    />

                </div>

                <div className={styles.searchboxIcon}>
                    <Search />
                </div>
            </div>
        </div>
    );
}