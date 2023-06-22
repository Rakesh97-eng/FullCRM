
import { Navigate, json } from "react-router-dom";



export const Protected = ({children})=>{
// let dispatch = useDispatch();
let Access = sessionStorage.getItem('Access');

//   useEffect(()=>{
//     if(Access){
//         dispatch(authenticate(Access));
//     }
    
//   },[Access])

return(
    
   Access?<>{children}</>:<Navigate to={{pathname:'/login'}}/>
    
)
}