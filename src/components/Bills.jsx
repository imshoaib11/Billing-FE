import React, { useState,useEffect } from 'react'
import TopBar from './TopBar';
import AxiosService from '../utils/AxiosService';
import ApiRoutes from '../utils/ApiRoutes';
import toast from 'react-hot-toast';
import Loader from './Loader'
import {Tabs} from 'antd';
import {useNavigate} from 'react-router-dom';

function Bills() {
    const {TabPane} = Tabs;

  return <>
    <TopBar/>

    <div className='mt-3 ml-3 mr-3 bs'>
        <div style={{backgroundColor:"black"}}>
        <h1 className='text-center font-clr' style={{fontSize:'40px',}}>PRINCE</h1>
        </div>
        <Tabs defaultActiveKey='1'>
        <TabPane tab="New Bill" key="1">
            <h1 style={{fontSize:'25px'}}>New Bills</h1>
            <NewBills />
        </TabPane>
        <TabPane tab="All Bills" key="2">
            <h1 style={{fontSize:'25px'}}>All Bills for Today</h1>
            <AllBills/>
        </TabPane>
        <TabPane tab="Summary" key="3">
            <h1 style={{fontSize:'25px'}}>End Sales</h1>
            <EndSales/>
        </TabPane>
    </Tabs>

    
    </div>
    </>
}
export default Bills

export function NewBills(){

    const currentDate = new Date()
    const billDate = currentDate.toLocaleDateString('en-IN', {timeZone: "Asia/Kolkata" })

    const options = {
        timeZone: "Asia/Kolkata",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false // 24-hour format; set to true for 12-hour format
      };
      
      const billTime = new Date().toLocaleString("en-IN", options);

      const [gpay,setGpay] = useState(0);
      const [cash,setCash] = useState(0);
      let totalAmount = Number(gpay)+Number(cash)
      let [loading,setLoading] = useState(false)
      let [error,setError] = useState(false)
      let[errMsg, seterrMsg] = useState("")
      let navigate = useNavigate()

      const sendPayment = async () => {
        try{
            
            let {message} = await AxiosService.post(`${ApiRoutes.NEWBILL.path}`,{
                billDate,
                billTime,
                gpay,
                cash,
                totalAmount
              })
              toast.success(message)
              navigate('/bills')
              
        }
        catch(error){
            console.log(error)
        }   
    }
    const[bill,setBill] = useState([])
    const prevBill = async()=>{
        try{
            setLoading(true)
            let {data,message} = await AxiosService.get(`${ApiRoutes.ALLTHEBILLS.path}`)
            let arr = data[data.length-1]
            setBill(arr)
            setLoading(false)
        }
        catch(error){
            setError(true)
            seterrMsg(error.message)
            setLoading(false)
        }
    }

    useEffect(()=>{
        prevBill()
    },[])

    return <>
        
        <div  style={{backgroundColor:"black"}}className='row'>
            <form>
                 <div style={{marginLeft:"20px"}} className='col-md-5 bs'>
                <div className="mb-3">
                    <label  className="form-label">DATE</label>
                    <input type="text" className="form-control ip-width" value={billDate} aria-label="Disabled input example" disabled/>
                </div>
                <div className="mb-3">
                    <label  className="form-label">GPAY</label>
                    <input type="text" className="form-control ip-width" id="exampleFormControlInput1" placeholder="0"  onChange={(e)=>setGpay(e.target.value)}/>
                </div>
                <div className="mb-3">
                    <label  className="form-label">CASH</label>
                    <input type="text" className="form-control ip-width" id="exampleFormControlInput1" placeholder="0" onChange={(e)=>setCash(e.target.value)}/>
                </div>
                <div className="mb-3">
                    <label  className="form-label">TOTAL</label>
                    <input style={{marginLeft:"10px"}}type="text" className="form-control-lg" value={totalAmount} aria-label="0" placeholder="0" disabled/>
                <div className="mb-3">
                <button  style={{width:"30%"}}className="btn btn-success mt-3" onClick={()=>sendPayment()}>PAY</button>
                </div>
            </div>
            </form>
           
            
       </div>
       
           <div style={{marginLeft:"50px"}} className='col-md-5 bs2'>
                <h2 className='text-center font-clr mt-2'>Previous Bill</h2>
                <hr className="font-clr"/>
                <b><p style={{fontSize:"22px"}}className='font-clr'>Bill No: {bill.billNo}</p></b>
                <b><p style={{fontSize:"22px"}}className='font-clr'>PAID: {bill.totalAmount}</p></b>
                <b><p style={{fontSize:"22px"}}className='font-clr'>GPAY: {bill.gpay}</p></b>
                <b><p style={{fontSize:"22px"}}className='font-clr'>CASH: {bill.cash}</p></b>
                <b><p style={{fontSize:"22px"}}className='font-clr'>Time: {bill.billTime}</p></b>

            </div>
        
        
    </div>
    </>
 
}

export function AllBills(){

    const [bills, setBills] = useState([])

    const currentDate = new Date()
    const billDate = currentDate.toLocaleDateString('en-IN', {timeZone: "Asia/Kolkata" })

    const getAllBills = async ()=>{
        try{
            let {data} = await AxiosService.post(`${ApiRoutes.ALLBILLS.path}`,{
                billDate
            })
            setBills(data)
        }
        catch(error){
            console.log(error)
        }
    }

    return <>
    
    <div className='mb-3'>
        <input type="text" className="form-control mb-3" value={billDate} aria-label="Disabled input example" disabled/>
        <button className='btn btn-primary' onClick={()=>getAllBills()}>Get Bills</button>
    </div>
    
    <div className='container'>
        <h3 className='mb-3'>Bills Today - {bills.length}</h3>
        <table className="table table-bordered">
        <thead>
            <tr>
            <th scope="col">#</th>
            <th scope="col">Bill No.</th>
            <th scope="col">Time</th>
            <th scope="col">GPay</th>
            <th scope="col">Cash</th>
            <th scope="col">Total</th>
            </tr>
        </thead>
        <tbody>
            {bills.map((bill,index)=>(
                <tr key={index}>
                <th scope="row">{index+1}</th>
                <td>{bill.billNo}</td>
                <td>{bill.billTime}</td>
                <td>{bill.gpay}</td>
                <td>{bill.cash}</td>
                <td>{bill.totalAmount}</td>
                </tr>
            ))}
        </tbody>
        </table>
    </div>
    </>
}

export function EndSales(){
        const currentDate = new Date()
        const date = currentDate.toLocaleDateString('en-IN', {timeZone: "Asia/Kolkata" })

        // Initialize sums
        let [user,setUser] = useState("")
        let totalGpay = 0;
        let totalCash = 0;
        let totalSales = 0; 
        let [expense,setExpense] = useState(0)
        let bundle = 0
        let [Notes,setNotes] = useState("")

        const[bills,setBills] = useState([])
        const getSummary = async ()=>{
            try{
                let {data} = await AxiosService.get(`${ApiRoutes.ALLTHEBILLS.path}`)
                console.log(data)
                setBills(data)
            }
            catch(error){
                console.log(error)
            }
        }

        useEffect(()=>{
            getSummary()
        },[])

        bills.forEach(bill => {
            if (bill.billDate === date) {
              totalGpay += bill.gpay;
              totalCash += bill.cash;
              totalSales += bill.totalAmount;
              bundle = Number(totalCash)-Number(expense)
            }
          });

          const sendData = async()=>{
            try{
                let {message} = await AxiosService.post(`${ApiRoutes.EOD.path}`,{
                    date,
                    totalSales,
                    totalGpay,
                    totalCash,
                    expense,
                    bundle,
                    user,
                    Notes
                })
                toast.success(message)   
            }
            catch(error){
                console.log(error)
            }
          }

        return<>
            <div className='container'>
            <div className='mb-3'>
            <label  className="form-label">DATE</label>
            <input className="form-control ip-width" type="text" value={date} aria-label="Disabled input example" disabled />
            </div>
            <div className='mb-3'>
            <label  className="form-label">Total Sales</label>
            <input className="form-control ip-width" type="text" value={totalSales} aria-label="Disabled input example" disabled />
            </div> 

            <div className='mb-3'>
            <label  className="form-label">Total Gpay</label>
            <input className="form-control ip-width" type="text" value={totalGpay} aria-label="Disabled input example" disabled />
            </div>
            <div className='mb-3'>
            <label  className="form-label">Total Cash</label>
            <input className="form-control ip-width" type="text" value={totalCash} aria-label="Disabled input example" disabled />
            </div>
            <div className='mb-3'>
            <label  className="form-label">Expense</label>
            <input type="text" className="form-control ip-width" id="exampleFormControlInput1" placeholder="0" value={expense} onChange={(e)=>setExpense(e.target.value)}/>
            </div>
            
            <div className='mb-3'>
            <label  className="form-label">Bundled</label>
            <input className="form-control ip-width" type="text" value={bundle} aria-label="Disabled input example" disabled />
            </div>

            <div className='mb-3'>
            <label  className="form-label">Closed By</label>
            <input type="text" className="form-control ip-width" id="exampleFormControlInput1" placeholder="Closed By ?" value={user} onChange={(e)=>setUser(e.target.value)}/>
            </div>

            <div className='mb-3'>
            <textarea className="form-control" id="exampleFormControlTextarea1" placeholder='Enter the notes' rows="3"
                                                        onChange={(e)=>setNotes(e.target.value)}></textarea>
            </div>
            
            <button className='btn btn-danger' onClick={()=>sendData()}>End Sales</button>
            </div>
        </>
}



