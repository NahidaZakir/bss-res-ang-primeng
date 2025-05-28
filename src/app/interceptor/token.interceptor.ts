import { HttpInterceptorFn } from '@angular/common/http';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  //extract token from localStorage
  const logData = localStorage.getItem('loginUserData');
  const userToken = localStorage.getItem('accessToken')
  if(logData !== null){
    const userData = JSON.parse(logData)
    const token = userData.token;
    const newReqData = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    })
      return next(newReqData);
  }else{
      return next(req);
  }


};
