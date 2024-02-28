import React from 'react'

function Address({workerDetails}) {
  return (
    <>
    <div className="space-y-3 w-fit">
            <h5 className="text-lg font-bold">Address/Near By</h5>
            <p >{workerDetails?.address}</p>
            </div>
            <div className="space-y-3 mt-3">
            <h5 className="text-lg font-bold">Mode of Payment</h5>
            <p >{workerDetails?.paymentMode}</p>
            </div>
            <div className="space-y-3 mt-3">
            <h5 className="text-lg font-bold">Availabiliy</h5>
            <p >{workerDetails?.workingDays}</p>
            <p>{workerDetails?.avilableTime}</p>
            </div>
    </>
  )
}

export default Address