import mockDate from 'mockdate';
import {ReactNode, useEffect} from 'react';

const useMockDate = (date: string) => {
  mockDate.set(date);
  useEffect(() => {
    return () => {
      mockDate.reset()
    }
  }, [])
}

export const MockDate = ({mockDate, children}: { mockDate: string; children: ReactNode}) => {
  useMockDate(mockDate);
  return <>{children}</>
}