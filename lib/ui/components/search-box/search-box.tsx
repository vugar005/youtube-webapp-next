import styles from './search-box.module.scss';
import { Search } from "@mui/icons-material";
import TextField from "@mui/material/TextField";
import Autocomplete from '@mui/material/Autocomplete';
import { useEffect, useRef, useState } from 'react';
import { useSearchList } from '../../hooks/useSearchList';
import { Subject, from } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';
import { IYoutubeSearchItem } from '../../models/youtube-search-list.model';

interface Props {
    debouncePeriod?: number;
    placeholder?: string;
    inputChangeHandler: (value: IYoutubeSearchItem | string) => void
}
export default function SearchBox(props: Props) {
    const { placeholder, debouncePeriod = 300 } = props;
    const [inputValue, setInputValue] = useState<string>('');
    const [options, setOptions] = useState<IYoutubeSearchItem[]>([]);
    const { fetchSeachItems, isSearchItemsLoading } = useSearchList();
    const optionSelected$ = useRef(new Subject<string>());

    const getOptionLabel = (option: IYoutubeSearchItem | string): string => {
        if (typeof option === 'string') {
            return option;
        }
        return option.snippet?.title || ''
    }

    useEffect(() => {
        const sub = optionSelected$.current
            .pipe(
                debounceTime(debouncePeriod),
                switchMap((val) => from(fetchSeachItems({ query: val })))
            )
            .subscribe((data: IYoutubeSearchItem[] | undefined) => {
                const items = data || [];
                setOptions(items);
            });

        return () => sub?.unsubscribe();
    }, [fetchSeachItems, debouncePeriod]);

    useEffect(() => {
        optionSelected$.current.next(inputValue);
    }, [inputValue]);

    return (
        <div className={styles.host}>
            <div className={styles.searchboxWrapper}>
                <div className={styles.searchboxField}>
                    <Autocomplete
                        freeSolo
                        options={options}
                        getOptionLabel={getOptionLabel}
                        disableClearable
                        loading={isSearchItemsLoading}
                        filterOptions={(x) => x}
                        sx={{ height: '100%', fontSize: '1.4rem' }}
                        onChange={(event: any, newValue: IYoutubeSearchItem | string) => props?.inputChangeHandler(newValue)}
                        onInputChange={(event, newInputValue) => {
                            setInputValue(newInputValue);
                        }}
                        renderInput={(params) => {
                            return (
                                <TextField {...params} label={placeholder} />
                            )
                           }
                        }
                    />

                </div>

                <div className={styles.searchboxIcon}>
                    <Search />
                </div>
            </div>
        </div>
    );
}