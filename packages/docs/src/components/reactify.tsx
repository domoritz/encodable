import React from 'react';

export type ReactifyProps = {
  id?: string;
  className?: string;
};

// TODO: add more React lifecycle callbacks as needed
export type LifeCycleCallbacks = {
  componentWillUnmount?: () => void;
};

export interface RenderFuncType<Props> {
  (container: HTMLDivElement, props: Readonly<Props & ReactifyProps>): void;
  displayName?: string;
  defaultProps?: Partial<Props & ReactifyProps>;
  propTypes?: React.WeakValidationMap<Props & ReactifyProps>;
}

export default function reactify<Props extends object>(
  renderFn: RenderFuncType<Props>,
  callbacks?: LifeCycleCallbacks,
): React.ComponentClass<Props & ReactifyProps> {
  class ReactifiedComponent extends React.Component<Props & ReactifyProps> {
    container?: HTMLDivElement;

    constructor(props: Props & ReactifyProps) {
      super(props);
      this.setContainerRef = this.setContainerRef.bind(this);
    }

    componentDidMount() {
      this.execute();
    }

    componentDidUpdate() {
      this.execute();
    }

    componentWillUnmount() {
      this.container = undefined;
      if (callbacks?.componentWillUnmount) {
        callbacks.componentWillUnmount.bind(this)();
      }
    }

    setContainerRef(ref: HTMLDivElement) {
      this.container = ref;
    }

    execute() {
      if (this.container) {
        renderFn(this.container, this.props);
      }
    }

    render() {
      const { id, className } = this.props;

      return <div ref={this.setContainerRef} id={id} className={className} />;
    }
  }

  const ReactifiedClass: React.ComponentClass<Props & ReactifyProps> = ReactifiedComponent;

  if (renderFn.displayName) {
    ReactifiedClass.displayName = renderFn.displayName;
  }
  // eslint-disable-next-line react/forbid-foreign-prop-types
  if (renderFn.propTypes) {
    ReactifiedClass.propTypes = { ...ReactifiedClass.propTypes, ...renderFn.propTypes };
  }
  if (renderFn.defaultProps) {
    ReactifiedClass.defaultProps = renderFn.defaultProps;
  }

  return ReactifiedComponent;
}
