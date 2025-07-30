import { useState } from 'react'
import './App.css'
import { Button } from './components/Button'


const enum OpType {
  NONE,
  ADD = "+",
  SUB = "-",
  MULTI = "*",
  DIV = "/",
  MOD = "%",
}

const ErrorStr = "ERROR";

function App() {

  const [curValue, setCurValue] = useState<string>('0');
  const [storedValue, setStoredValue] = useState<number>(0);
  const [lastOp, setLastOp] = useState<OpType>(OpType.NONE);
  const [hasDecimal, setHasDecimal] = useState<boolean>(false);

  function TruncateDecimal(value: string, decimals: number): string {
    const [intPart, decimalPart = ""] = value.split(".");

    if (decimals === 0) return intPart;

    const truncated = decimalPart.slice(0, decimals);
    return `${intPart}.${truncated}`;
  }



  function RemoveLast() {
    if (curValue === '0') return;
    if (curValue === '.') {
      setHasDecimal(false);
    }
    setCurValue(curValue.slice(0, -1))
  }

  function Clear(all?: boolean) {
    setStoredValue(0);
    setLastOp(OpType.NONE);
    if (!all) return;
    setCurValue('0');
    setHasDecimal(false);
  }

  function SetValue(value: number | string) {



    if (value === '.') {
      if (curValue.includes('.')) {
        setHasDecimal(true);
        return;
      }
      if (hasDecimal) return;
      setHasDecimal(true);
    }

    if (value === ErrorStr) {
      setCurValue(ErrorStr);
      return;
    }

    if (curValue === '0' && value !== '.') {
      setCurValue(value.toString());
      return;
    }

    if (curValue === ErrorStr) {
      const trimmedStr = curValue.slice(ErrorStr.length - 1, -1);
      setCurValue(trimmedStr + value);
      console.log(trimmedStr);
      return;
    }
    let fullValue = curValue + value;
    if (hasDecimal) {
      fullValue = TruncateDecimal(fullValue, 10);
    }
    setCurValue(fullValue);
  }

  function SetOp(op: OpType) {
    if (hasDecimal) {
      setHasDecimal(false);
    }
    setLastOp(op);
    const v = Number(curValue);
    setStoredValue(v);
    setCurValue('0');
  }

  function ShowResult() {

    let result: string = '0';
    switch (lastOp) {
      case OpType.ADD:
        result = (storedValue + Number(curValue)).toString();
        break;
      case OpType.MULTI:
        result = (storedValue * Number(curValue)).toString();
        break;
      case OpType.SUB:
        result = (storedValue - Number(curValue)).toString();
        break;
      case OpType.DIV:
        if (curValue === '0') {
          SetValue(ErrorStr);
          return;
        }
        result = (storedValue / Number(curValue)).toString();
        break;
      case OpType.MOD:
        result = (storedValue % Number(curValue)).toString();
        break;
    }
    if (hasDecimal) {
      setHasDecimal(false);
      result = TruncateDecimal(result, 10);
    }
    setCurValue(result);
    Clear(false);
  }

  function GetFullOp(): string {
    if (!lastOp) {
      return '~';
    }
    return `${storedValue}${lastOp}`
  }

  return (
    <>
      <div className='value_display'>
        <div className='screen_bg'></div>
        <label className="op_value" defaultValue="-">{GetFullOp()}</label>
        <label className="cur_value" defaultValue="0">{curValue}</label>
      </div>

      <div className='btn_container'>

        <Button className='ac_btn' title='AC' onClick={Clear} />
        <Button className="op_btn" title='( )' onClick={() => SetValue('(')} />

        <Button className='op_btn' title='%' onClick={() => SetOp(OpType.MOD)} />
        <Button className='op_btn' title='/' onClick={() => SetOp(OpType.DIV)} />

        <Button title='7' onClick={() => SetValue(7)} />
        <Button title='8' onClick={() => SetValue(8)} />
        <Button title='9' onClick={() => SetValue(9)} />

        <Button className='op_btn' title='*' onClick={() => SetOp(OpType.MULTI)} />

        <Button title='4' onClick={() => SetValue(4)} />
        <Button title='5' onClick={() => SetValue(5)} />
        <Button title='6' onClick={() => SetValue(6)} />

        <Button className='op_btn' title='-' onClick={() => SetOp(OpType.SUB)} />

        <Button title='1' onClick={() => SetValue(1)} />
        <Button title='2' onClick={() => SetValue(2)} />
        <Button title='3' onClick={() => SetValue(3)} />

        <Button className='op_btn' title='+' onClick={() => SetOp(OpType.ADD)} />

        <Button title='0' onClick={() => SetValue(0)} />
        <Button title=',' onClick={() => SetValue('.')} />
        <Button className="op_btn rem_btn" title='x' onClick={RemoveLast} />

        <Button className="op_btn rs_btn" title='=' onClick={ShowResult} />

      </div>
    </>
  )
}

export default App
