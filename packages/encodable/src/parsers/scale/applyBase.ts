import { DefaultOutput, D3Scale, ScaleConfig } from '../../types';

export default function applyBase<Output extends DefaultOutput>(
  config: ScaleConfig<Output>,
  scale: D3Scale<Output>,
) {
  if ('base' in config && typeof config.base !== 'undefined' && 'base' in scale) {
    scale.base(config.base);
  }
}
