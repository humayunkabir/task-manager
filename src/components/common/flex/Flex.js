import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import flex from './flex.module.scss';

const propTypes = {
  children: PropTypes.node.isRequired,
  tag: PropTypes.any,
  className: PropTypes.string,
  align: PropTypes.oneOf([
    false,
    'start',
    'end',
    'center',
    'baseline',
    'stretch',
  ]),
};

const defaultProps = {
  tag: 'div',
  className: '',
};

// Flex Item
export const FlexItem = ({ tag: Tag, className, align, children, ...rest }) => {
  return (
    <Tag
      className={classNames(
        { [flex[`flex-align-${align}`]]: !!align },
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
};

FlexItem.propTypes = { ...propTypes };

FlexItem.defaultProps = { ...defaultProps };

// Flex Container
const Flex = ({
  tag: Tag,
  className,
  inline,
  row,
  column,
  align,
  justify,
  wrap,
  children,
  innerRef,
  ...rest
}) => {
  return (
    <Tag
      className={classNames(
        {
          [flex.flex]: !inline,
          [flex['flex-inline']]: inline,
          [flex['flex-row']]: row === true && !column,
          [flex['flex-row-reverse']]: row === 'reverse' && !column,
          [flex['flex-column']]: column === true,
          [flex['flex-column-reverse']]: column === 'reverse',
          [flex[`flex-align-${align}`]]: !!align,
          [flex[`flex-justify-${justify}`]]: !!justify,
          [flex['flex-wrap']]: wrap,
        },
        className,
      )}
      ref={innerRef}
      {...rest}
    >
      {children}
    </Tag>
  );
};

Flex.propTypes = {
  ...propTypes,
  inline: PropTypes.bool,
  row: PropTypes.oneOf([true, false, 'reverse']),
  column: PropTypes.oneOf([true, false, 'reverse']),
  justify: PropTypes.oneOf([
    false,
    'start',
    'end',
    'center',
    'between',
    'around',
    'evenly',
  ]),
  wrap: PropTypes.bool,
};

Flex.defaultProps = {
  ...defaultProps,
  inline: false,
  row: false,
  column: false,
  align: false,
  justify: false,
  wrap: false,
};

export default Flex;
