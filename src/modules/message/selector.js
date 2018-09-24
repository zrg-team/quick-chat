import React from 'react'
import YouTube from 'react-youtube'
import {
  Tooltip
} from '@material-ui/core'
import { createSelector } from 'reselect'
import { GOOGLE_API_KEY } from '../../common/models'
import { MODULE_NAME as MODULE_MESSAGE } from './models'
import { getMe } from '../../common/utils/cryptography'
import ethereumLogo from '../../assets/images/ethereum-icon.svg'
const ReactMarkdown = require('react-markdown')

const getMessages = (state) => {
  const room = state[MODULE_MESSAGE].selected
  return room ? state[MODULE_MESSAGE].messages[room.id] : []
}
const getRoom = (state) => state[MODULE_MESSAGE].selected

export const selectorMessages = createSelector(
  [ getMessages, getRoom ],
  (messages, room) => {
    if (!room || !room.shared || !messages) {
      return []
    }
    return messages.map((item) => {
      try {
        const type = ['text', 'url', 'markdown', 'youtube', 'ethereum', 'ethereum-transaction']
          .includes(item.type)
          ? 'text' : item.type
        const data = getMe(item.data, room.shared)
        let text = ''
        let uri = null
        let objectData = {}
        switch (item.type) {
          case 'url':
            text = <a target='_blank' href={data}>{data}</a>
            break
          case 'text':
            text = <p>{data}</p>
            break
          case 'location':
            objectData = JSON.parse(data)
            break
          case 'youtube':
            text = <YouTube
              videoId={`${data}`}
              opts={{
                width: '400',
                playerVars: {
                  autoplay: 0
                }
              }}
            />
            break
          case 'spotify':
            uri = data
            break
          case 'markdown':
            text = <ReactMarkdown source={data} />
            break
          case 'ethereum-transaction':
            objectData = {
              txID: data
            }
            text = (
              <div className='card-send-ethereum'>
                <div className='card-content-send-ethereum'>
                  <div className='main-content-send-ethereum'>
                    <div className='card-detail-send-ethereum'>
                      <div className='card-detail-title-send-ethereum'>
                        <img src={ethereumLogo} />
                        <div className='title-company-send-ethereum'>
                          <p>{`${objectData.txID}`.slice(0, 50)}...</p>
                          <a href='javascript:void(0);' className='value-send-ethereum'>
                            View In Blockchain
                          </a>
                        </div>
                        <div className='default-margin-send-ethereum' />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
            break
          case 'ethereum':
            objectData = JSON.parse(data)
            text = !item.sender ? (
              <div className='card-send-ethereum'>
                <div className='card-content-send-ethereum'>
                  <div className='main-content-send-ethereum'>
                    <div className='card-detail-send-ethereum'>
                      <div className='card-detail-title-send-ethereum'>
                        <img src={ethereumLogo} />
                        <div className='title-company-send-ethereum'>
                          <Tooltip title={objectData.address} placement='top'>
                            <p>{`${objectData.address}`.slice(0, 20)}...</p>
                          </Tooltip>
                          <p className='value-send-ethereum'>
                            {objectData.value} <span>ETH</span>
                          </p>
                        </div>
                        <div>
                          <div className='cards-special-send-ethereum'>
                            <div className='card-special-title-send-ethereum'>
                              <div>
                                <i className='fa fa-paper-plane' aria-hidden='true' />
                              </div>
                              <p>Send Money</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className='card-send-ethereum'>
                <div className='card-content-send-ethereum'>
                  <div className='main-content-send-ethereum'>
                    <div className='card-detail-send-ethereum'>
                      <div className='card-detail-title-send-ethereum'>
                        <img src={ethereumLogo} />
                        <div className='title-company-send-ethereum'>
                          <Tooltip title={objectData.address} placement='top'>
                            <p>{`${objectData.address}`.slice(0, 20)}...</p>
                          </Tooltip>
                          <p className='value-send-ethereum'>
                            {objectData.value} <span>ETH</span>
                          </p>
                        </div>
                        <div>
                          <div className='cards-special-send-ethereum'>
                            <div className='card-special-title-send-ethereum'>
                              <div>
                                <i className='fas fa-spinner' aria-hidden='true' />
                              </div>
                              <p>Waiting</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
            break
        }
        return {
          ...item,
          title: item.sender ? undefined : room.guestName,
          position: item.sender ? 'right' : 'left',
          type: type,
          messageType: item.type,
          text,
          uri,
          data: objectData,
          apiKey: GOOGLE_API_KEY,
          className: 'message-box-container',
          date: new Date(item.time)
        }
      } catch (err) {
        console.log('err', err)
        return undefined
      }
    }).filter(item => item)
  }
)
