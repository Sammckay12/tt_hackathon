import React from 'react';
import PropTypes from 'prop-types';
import { Transition } from 'react-transition-group';

const SlideInOut = ({children, duration, in: inProp}) => {
  const defaultStyle = {
    position: 'absolute',
    transition: `transform ${duration}ms ease-in-out, opacity ${duration}ms ease-in-out`,
    top: 0
  };

  const transitionStyles = {
    entering: {
      transform: 'translate(-100%)',
      opacity: 0
    },
    entered:  {
      transform: 'translate(0%)',
      opacity: 1
    },
    exiting: {
      transform: 'translate(0%)',
      opacity: 1
    },
    exited: {
      transform: 'translate(-100%)',
      opacity: 0
    }
  };

  return (
    <Transition in={inProp} timeout={300} mountOnEnter>
      {(state) => (
        <div
           style={{
             ...defaultStyle,
             ...transitionStyles[state]
           }}
           >
          {children}
          </div>
      )}
    </Transition>
  );
};

SlideInOut.propTypes = {
  duration: PropTypes.number
};

SlideInOut.defaultProps = {
  duration: 300
};

export default SlideInOut;
