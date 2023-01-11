import React from 'react'
import { Container, Theme, makeStyles, createStyles, Button } from '@material-ui/core'
import { Formik, Field, Form } from 'formik'

const useStyles = makeStyles((theme: Theme) => createStyles({
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
        margin: '0px 20px',
        width: '800px'
    },
    textfield: {
        padding: '5px 0',
        width: '100%'
    }
}))

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
    const validationControl = (values: SearchValues) => {
        const errors = {}
        return errors
    }
    
    const onSubmit = (values: SearchValues, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
        props.requestUsers(props.pageSize, props.currentPage, values.term)
        setSubmitting(false)
    }
    return (
        <Container className={classes.container}>
            <Formik
                initialValues={{ term: '' }}
                validate={validationControl}
                onSubmit={onSubmit}>
                {({ isSubmitting }) => (
                    <Form className={classes.form}>
                        <div className={classes.textfieldWrapper}>
                            <Field className={classes.textfield} type="text" name="term" /> 
                        </div>
                        <Button color="default" variant="contained" type="submit" disabled={isSubmitting}>
                            Search
                        </Button>
                    </Form>
                )}
            </Formik>
        </Container>
    )
}

export default SearchNewFriends