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

function App() {

  const [curValue, setCurValue] = useState<string>('0');
  const [storedValue, setStoredValue] = useState<number>(0);
  const [lastOp, setLastOp] = useState<OpType>(OpType.NONE);

  function RemoveLast() {
    if (curValue === '0') return;
    setCurValue(curValue.slice(0, -1))
  }

  function Clear(all?: boolean) {
    setStoredValue(0);
    setLastOp(OpType.NONE);
    if (!all) return;
    setCurValue('0');
  }

  function SetValue(value: number | string) {
    if (curValue === '0') {
      setCurValue(value.toString());
    } else {
      setCurValue(curValue + value);
    }
  }

  function SetOp(op: OpType) {
    setLastOp(op);
    const v = Number(curValue);
    setStoredValue(v);
    setCurValue('0');
  }



  function ShowResult() {
    switch (lastOp) {
      case OpType.ADD:
        setCurValue((storedValue + Number(curValue)).toString());
        break;
      case OpType.MULTI:
        setCurValue((storedValue * Number(curValue)).toString());
        break;
      case OpType.SUB:
        setCurValue((storedValue - Number(curValue)).toString());
        break;
      case OpType.DIV:
        setCurValue((storedValue / Number(curValue)).toString());
        break;
      case OpType.MOD:
        setCurValue((storedValue % Number(curValue)).toString());
        break;
    }
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
        <Button className="op_btn" title='( )' onClick={() => SetValue(7)} />

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
