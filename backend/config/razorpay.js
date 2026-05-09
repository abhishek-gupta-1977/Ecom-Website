import razorpay from 'razorpay';

const instance = new razorpay({
    key_id:process.env.RAZORPAY_KEY,
    key_secret:process.env.RAZORPAY_SECRET
})
console.log(process.env.RAZORPAY_KEY)
console.log(process.env.RAZORPAY_SECRET);



export default instance

