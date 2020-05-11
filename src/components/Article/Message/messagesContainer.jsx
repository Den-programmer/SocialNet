import Messages from "./message";
import { connect } from 'react-redux';
import { withAuthRedirect } from "../../../HOC/withAuthRedirect";

const MessagesContainer = withAuthRedirect(connect(null, null)(Messages)); 

export default MessagesContainer;