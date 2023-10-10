import { NavigationContainerRef, ParamListBase } from '@react-navigation/native';
import { RefObject } from 'react'
import * as React from 'react';

export const navigationRef: RefObject<NavigationContainerRef<ParamListBase>> = React.createRef();

export function navigate(name: string, params: any) {
  navigationRef.current?.navigate(name, params);
}

export function navigation() {
  return navigationRef.current;
}