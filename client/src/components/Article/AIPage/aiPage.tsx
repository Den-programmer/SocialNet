import { useGetGroqChatCompletionQuery } from "../../../DAL/AI/aiAPI"
import { useAuthRedirect } from "../../../hooks/hooks"
import classes from './aiPage.module.scss'

const AIPage = () => { 
  let data = {
    data: {
      content: "This is a mock AI response."
    }
  }
  let isLoading = false
  let error = null
  useAuthRedirect()
  // const { data, error, isLoading } = useGetGroqChatCompletionQuery("Hello,AI!")
  console.log(data)
  return (
    <div className={classes.aipage}>
      <h1>AI Page</h1>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error occurred while fetching AI response.</p>}
      {data && <p>AI Response: {data.data.content || "No content"}</p>}
    </div>
  )
}

export default AIPage