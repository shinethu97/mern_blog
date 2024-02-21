export const fMsg = (res, message="", result=[])=>{
    res.status(200).json({
        con:true,
        message,
        result
    })
}