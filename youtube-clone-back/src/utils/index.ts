import fs from 'fs';
import dotenv from 'dotenv';
import path from 'path';

function memoize<Func extends (this: any, ...args: any[]) => any>(func: Func) {
  const cache = new Map<string, ReturnType<Func>>();
  return function (this: ThisParameterType<Func>, ...args: Parameters<Func>) : ReturnType<Func> {
    const key = JSON.stringify(args);
    if (!cache.has(key)) { // 이미 동일한 인자에 대한 결과가 있으면 리턴
      // console.log('본체 실행', args);
      cache.set(key, func.apply(this, args));
    }
    else {
      // console.log('캐시로 결과 바로 리턴', args);
    }
    return cache.get(key) || func.apply(this, args); // func.apply(...)는 undefined 리턴 회피용
  }
}

function argumentsToString(args: IArguments) {
  // return JSON.stringify(args); 으로 대체 가능
  return Array.from(args).map(arg => JSON.stringify(arg));
}

function hasOwnProperty<T, K extends PropertyKey>(
  obj: T,
  prop: K
): obj is T & Record<K, unknown> {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

function ObjectKeys<ObjectType extends object>(object : ObjectType) {
  return Object.keys(object) as Array<keyof ObjectType>;
}

function checkFsExistsInEachProperties(files: object) {
  return (Object.keys(files) as Array<keyof typeof files>)
    .some((key) => fs.existsSync(files[key]));
}

// ----- server settings -----

function getNODE_ENV() {
  if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'development')
    return 'development';
  return process.env.NODE_ENV || 'development';
}

// ----- export utils -----

const utils = {
  argumentsToString,
  checkFsExistsInEachProperties,
  getNODE_ENV,
  hasOwnProperty,
  ObjectKeys,
}

type CachedUtils = {[key in keyof typeof utils] : ReturnType<typeof memoize<typeof utils[key]>>}

const cachedUtils : CachedUtils = Object.fromEntries(Object.entries(utils).map(([key, value]) => {
  return [key, memoize(value)]
})) as CachedUtils

export default Object.freeze(cachedUtils);