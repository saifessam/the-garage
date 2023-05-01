import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Button from '../button/Button';
import { ReactComponent as ArrowLeftSVG } from '../../assets/svgs/arrow-left.svg';
import { ReactComponent as ArrowRightSVG } from '../../assets/svgs/arrow-right.svg';
import Message from './../message/Message';
import Spinner from '../spinner/Spinner';
import './styles.css';
import Login from '../../functions/Login';

const Form = ({ children, mutation, variables, prev, title, next, buttonLabel, notCentered, sticky, noSubmit }) => {
  const navigate = useNavigate();
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

  const [mutate, { loading }] = useMutation(mutation, {
    onCompleted(data) {
      const status = Object.entries(data)[0][1].status;
      const response = Object.entries(data)[0][1].response;
      const token = Object.entries(data)[0][1].token;
      setMessage({ status, response });
      if (token) {
        Login(token, navigate);
      }
    },
    onError(error) {
      console.error(error);
    },
  });

  const handleSubmition = async (e) => {
    e.preventDefault();
    console.log(variables);
    await mutate({ variables });
  };

  const renderClassNames = () => {
    const classNames = [];
    if (notCentered) {
      classNames.push('not-centerd');
    }
    if (sticky) {
      classNames.push('sticky');
    }

    return classNames.join(' ');
  };

  return (
    <form className={renderClassNames()} onSubmit={(e) => handleSubmition(e)}>
      <div className="form-title">
        {next && (
          <Button type={'button'} action={() => navigate(prev)} data={'transparent'}>
            <ArrowLeftSVG />
          </Button>
        )}
        <h4>{title}</h4>
        {prev && (
          <Button type={'button'} action={() => navigate(next)} data={'transparent'}>
            <ArrowRightSVG />
          </Button>
        )}
      </div>
      <div className="form-body">{children}</div>
      <div className="form-footer">
        {showMessage()}
        {noSubmit ? null : (
          <Button type={'submit'} action={() => {}}>
            {loading ? <Spinner /> : buttonLabel}
          </Button>
        )}
      </div>
    </form>
  );
};

export default Form;
