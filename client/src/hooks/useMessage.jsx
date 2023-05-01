import { useState } from 'react';
import Message from './../components/message/Message';

const useMessage = ({ status, response }) => {
  const [message, setMessage] = useState({
    status: null,
    response: '',
  });

  const showMessage = () => {
    if (message.status === false) {
      return <Message data={'error'}>{message.response}</Message>;
    } else if (message.status === true) {
      return <Message data={'success'}>{message.response}</Message>;
    }
  };

  return showMessage();
};

export default useMessage;
