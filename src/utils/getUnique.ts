/* eslint-disable @typescript-eslint/no-explicit-any */
import _ from 'lodash'

export const RANDOM_UNIQUE  = () => Math.random() + Date.now()

export const uniqueArrayOfObj = (array: Record<string, any>[] | [], key: string) => _.uniqBy(array, key)

export const RANDOM_UNIQUE_STR = () => (Math.random() + Date.now()).toString().split('.')[0]


