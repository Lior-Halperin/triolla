import UrlDomainModel from "../Models/UrlDomainModel"

const urlDomain: UrlDomainModel = new UrlDomainModel('http://localhost:3001') 
export interface IConfig {
    baseURL:string
    eventsURL: string
}

const environments:any = { 
    development: {
      baseURL: `${urlDomain.protocol}`+`${urlDomain.domain}`+'api/',
      eventsURL: `${urlDomain.protocol}`+`${urlDomain.domain}`+'api/event',
    },
    test: {
        baseURL: `${urlDomain.protocol}`+`${urlDomain.domain}`+'api/',
        eventsURL: `${urlDomain.protocol}`+`${urlDomain.domain}`+'api/event',
    },
    production: {
        baseURL: `${urlDomain.protocol}`+`${urlDomain.domain}`+'api/',
        eventsURL: `${urlDomain.protocol}`+`${urlDomain.domain}`+'api/event',
    }
  }
  
  const currentEnvironment = process.env.NODE_ENV || 'development'
  
  const config:IConfig = {
    ...environments[currentEnvironment],
  }
  
  export default config;
