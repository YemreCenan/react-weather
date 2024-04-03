export interface WeatherModel {
location:{
  name : string;
  country:string;
}

forecast:{
  forecastday:[

  ];
}

current:{
   humidity:string;
   wind_kph:string;
}




}