import React from 'react'
import { Container, Theme, makeStyles, createStyles, Button, useMediaQuery } from '@material-ui/core'
import { useForm } from 'react-hook-form'
import { scrollToTop } from '../../../../../../utils/helpers/functions/function-helpers'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            display: 'flex',
            justifyContent: 'center',
            margin: '15px auto',
            width: '100%',
        },
        form: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            width: '100%',
        },
        textfieldWrapper: {
            margin: '10px',
            width: '100%',
            maxWidth: '800px',
        },
        textfield: {
            padding: '10px',
            width: '100%',
            border: '1px solid #ccc',
            borderRadius: '4px',
            fontSize: '16px',
            backgroundColor: '#f9f9f9',
            '&:focus': {
                borderColor: theme.palette.primary.main,
                outline: 'none',
                boxShadow: `0 0 5px ${theme.palette.primary.main}`,
            }
        },
        button: {
            marginTop: '10px',
            width: '150px',
        },
        textfieldContainer: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            width: '100%',
            margin: '10px',
        }
    })
);


interface ISearchNewFriends {
    requestUsers: (pageSize: number, currentPage: number, term: string) => void
    pageSize: number
    currentPage: number
}

type SearchValues = {
    term: string
}

const SearchNewFriends: React.FC<ISearchNewFriends> = (props) => {
    const classes = useStyles()
    const { register, handleSubmit, formState: { isSubmitting } } = useForm<SearchValues>()

    const isSmallScreen = useMediaQuery('(max-width:600px)');

    const onSubmit = (values: SearchValues) => {
        props.requestUsers(props.pageSize, props.currentPage, values.term)
    }

    const searchAnimmation = () => {
        setTimeout(() => scrollToTop(400), 250)
    }

    return (
        <Container className={classes.container}>
            <form onSubmit={handleSubmit(onSubmit)} className={classes.form} style={{ flexDirection: isSmallScreen ? 'column' : 'row' }}>
                <div className={classes.textfieldContainer}>
                    <div className={classes.textfieldWrapper}>
                        <input
                            {...register('term', { required: true })}
                            className={classes.textfield}
                            type="text"
                            placeholder="Search for friends"
                        />
                    </div>

                    <Button onClick={searchAnimmation} color="default" variant="contained" type="submit" disabled={isSubmitting}>
                        Search
                    </Button>
                </div>
            </form>
        </Container>
    )
}

export default SearchNewFriends