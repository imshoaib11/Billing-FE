import React,{useState,useEffect} from 'react'
import AxiosService from '../utils/AxiosService'
import ApiRoutes from '../utils/ApiRoutes'
function AdminPanel() {

  let [date,setDate] = useState("")
  let [sales,setSales] = useState([])
  

  const getData = async()=>{
    let {data,message} = await AxiosService.post(`${ApiRoutes.SALES.path}`,{
      date
    })
    setSales(data)
    console.log(sales)
  }
  return <>
    <div className='container'>
      <div className="mb-3">
            <label  className="form-label">Enter Date</label>
            <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Enter the Date"  onChange={(e)=>setDate(e.target.value)}/>
      </div>
      <button className='btn btn-primary' onClick={()=>getData()}>Show Sales</button>

      {sales.map((sale,index) => (
        <>
        
           <div className='mb-3'>
            <label  className="form-label">Total Sales</label>
            <input className="form-control" type="text" value={sale.totalSales} aria-label="Disabled input example" disabled />
            </div> 
            <div className='mb-3'>
            <label  className="form-label">Total Gpay</label>
            <input className="form-control" type="text" value={sale.totalGpay} aria-label="Disabled input example" disabled />
            </div>
            <div className='mb-3'>
            <label  className="form-label">Total Cash</label>
            <input className="form-control" type="text" value={sale.totalCash} aria-label="Disabled input example" disabled />
            </div>
            <div className='mb-3'>
            <label  className="form-label">Expense</label>
            <input className="form-control" type="text" value={sale.expense} aria-label="Disabled input example" disabled />
            </div>
            <div className='mb-3'>
            <label  className="form-label">Bundle</label>
            <input className="form-control" type="text" value={sale.bundle} aria-label="Disabled input example" disabled />
            </div>
            <div className='mb-3'>
            <label  className="form-label">Closed By</label>
            <input className="form-control" type="text" value={sale.user} aria-label="Disabled input example" disabled />
            </div>
            <div className='mb-3'>
            <label  className="form-label">Notes</label>
            <input className="form-control" type="text" value={sale.Notes} aria-label="Disabled input example" disabled />
            </div>
          </>
      ))}
    </div>
  </>
}

export default AdminPanel