import styles from './search-box.module.scss';
import { Search } from "@mui/icons-material";
import TextField from "@mui/material/TextField";
import { useEffect, useRef, useState } from 'react';
import { useSearchList } from '../../hooks/useSearchList';
import { Subject, from } from 'rxjs';
import { debounceTime, switchMap, tap } from 'rxjs/operators';
import Autocomplete from '@mui/material/Autocomplete';
import { useRouter } from 'next/router';

interface Props {
    debouncePeriod?: number;
    placeholder?: string;
}
export default function SearchBox(props: Props) {
    const router = useRouter();
    const { placeholder, debouncePeriod = 300 } = props;
    const [inputValue, setInputValue] = useState('');
    const [value, setValue] = useState<string | null>('');
    const { fetchSeachItems, searchItems } = useSearchList();
    const options: string[] = searchItems?.map((item) => item.snippet?.title) || [];
    const optionSelected$ = useRef(new Subject<string>());

    useEffect(() => {
        const sub = optionSelected$.current
            .pipe(
                debounceTime(debouncePeriod),
                switchMap((val) => from(fetchSeachItems({ query: val })))
            )
            .subscribe((data) => {
                console.log('SEARCH_DATA', data);
            });

        return () => sub?.unsubscribe();
    }, []);

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
    }, [value]);

    return (
        <div className={styles.host}>
            <div className={styles.searchboxWrapper}>
                <div className={styles.searchboxField}>
                    <Autocomplete
                        freeSolo
                        options={options}
                        value={value}
                        sx={{ height: '100%', fontSize: '1.4rem' }}
                        onChange={(event: any, newValue: string | null) => {
                            setValue(newValue);
                        }}
                        inputValue={inputValue}
                        onInputChange={(event, newInputValue) => {
                            setInputValue(newInputValue);
                        }}
                        renderInput={(params) =>
                            <TextField {...params} label={placeholder} />}
                    />

                </div>

                <div className={styles.searchboxIcon}>
                    <Search />
                </div>
            </div>
        </div>
    );
}