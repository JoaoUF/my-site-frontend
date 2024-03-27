import { AxiosResponse } from 'axios'
import AxiosConfig from '../AxiosConfig'
import { Item } from './item.interface'

export class ItemService {
  listarItem(accessToken: string): Promise<Item[]> {
    return AxiosConfig.get('item/', {
      headers: {
        "Content-Type": "application/json",
        "Authorization": 'Bearer ' + accessToken
      }
    }).then((response: AxiosResponse<Item[]>) => response.data)
  }

  listarItemSegunUsuario(pk: number, accessToken: string): Promise<Item[]> {
    return AxiosConfig.get(`item/?usuario=${pk}`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": 'Bearer ' + accessToken
      }
    }).then((response: AxiosResponse<Item[]>) => response.data)
  }

  crearItem(data: any, accessToken: string): Promise<Item> {
    return AxiosConfig.post('item/', data, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": 'Bearer ' + accessToken
      }
    }).then((response: AxiosResponse<Item>) => response.data)
  }

  buscarItem(pk: number, accessToken: string): Promise<Item> {
    return AxiosConfig.get(`item/${pk}/`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": 'Bearer ' + accessToken
      }
    }).then((response: AxiosResponse<Item>) => response.data)
  }

  actualizarItem(pk: number, data: any, accessToken: string): Promise<Item> {
    return AxiosConfig.put(`item/${pk}/`, data, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": 'Bearer ' + accessToken
      }
    }).then((response: AxiosResponse<Item>) => response.data)
  }

  eliminarItem(pk: number, accessToken: string): Promise<Item> {
    return AxiosConfig.delete(`item/${pk}/`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": 'Bearer ' + accessToken
      }
    }).then((response: AxiosResponse<Item>) => response.data)
  }
}