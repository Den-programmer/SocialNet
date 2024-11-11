import React from 'react'
import { Container, Theme, makeStyles, createStyles, Button } from '@material-ui/core'
import { useForm } from 'react-hook-form'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            display: 'flex',
            justifyContent: 'center',
            margin: '15px auto'
        },
        form: {
            display: 'flex',
            alignItems: 'center'
        },
        textfieldWrapper: {
            margin: '0px 40px',
            width: '800px'
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
        }
    })
)

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

    const onSubmit = (values: SearchValues) => {
        props.requestUsers(props.pageSize, props.currentPage, values.term)
    }

    return (
        <Container className={classes.container}>
            <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
                <div className={classes.textfieldWrapper}>
                    <input
                        {...register('term', { required: true })}
                        className={classes.textfield}
                        type="text"
                        placeholder="Search for friends"
                    />
                </div>
                <Button color="default" variant="contained" type="submit" disabled={isSubmitting}>
                    Search
                </Button>
            </form>
        </Container>
    )
}

export default SearchNewFriends