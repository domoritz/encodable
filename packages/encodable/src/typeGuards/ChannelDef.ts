import { DefaultOutput } from '../types/Core';
import {
  ChannelDef,
  NonValueDef,
  FieldDef,
  TypedFieldDef,
  PositionFieldDef,
  ScaleFieldDef,
  ValueDef,
} from '../types/ChannelDef';

export function isValueDef<Output extends DefaultOutput>(
  channelDef: ChannelDef<Output>,
): channelDef is ValueDef<Output> {
  return channelDef && 'value' in channelDef;
}

export function isNonValueDef<Output extends DefaultOutput>(
  channelDef: ChannelDef<Output>,
): channelDef is NonValueDef<Output> {
  return channelDef && !('value' in channelDef);
}

export function isFieldDef<Output extends DefaultOutput>(
  channelDef: ChannelDef<Output>,
): channelDef is FieldDef {
  return channelDef && 'field' in channelDef && !!channelDef.field;
}

export function isTypedFieldDef<Output extends DefaultOutput>(
  channelDef: ChannelDef<Output>,
): channelDef is TypedFieldDef {
  return isFieldDef(channelDef) && 'type' in channelDef && !!channelDef.type;
}

export function isScaleFieldDef<Output extends DefaultOutput>(
  channelDef: ChannelDef<Output>,
): channelDef is ScaleFieldDef<Output> {
  return isTypedFieldDef(channelDef) && 'scale' in channelDef;
}

export function isPositionFieldDef<Output extends DefaultOutput>(
  channelDef: ChannelDef<Output>,
): channelDef is PositionFieldDef<Output> {
  return isTypedFieldDef(channelDef) && 'axis' in channelDef;
}
