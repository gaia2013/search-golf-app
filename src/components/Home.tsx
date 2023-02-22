import React, { useState } from 'react'
import './Common.css'

import DatePicker, { registerLocale } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import ja from 'date-fns/locale/ja'

const Home = () => {
  const Today = new Date()
  const [date, setDate] = useState(Today)
  registerLocale('ja', ja)

  return (
    <div className="ui container" id="container">
      <div className="Search__Form">
        <form className="ui form segment">
          <div className="field">
            <label>
              <i className="calendar alternate outline icon"></i>プレー日
            </label>
            <DatePicker
              dateFormat="yyyy/MM/dd"
              locale="ja"
              selected={date}
              minDate={Today}
              onChange={(selectedDate) => {
                setDate(selectedDate || Today)
              }}
            />
          </div>
          <div className="field">
            <label>
              <i className="yen sign icon"></i>上限金額
            </label>
            <select name="dropdown" id="" className="ui dropdown">
              <option value="8000">8000円 </option>
              <option value="12000">12000</option>
              <option value="16000">16000</option>
            </select>
          </div>
          <div className="field">
            <label htmlFor="">
              <i className="map pin icon"></i>
              移動時間計算の出発地点（自宅から近い地点をお選びください）
            </label>
            <select name="dropdown" id="" className="ui dropdown">
              <option value="1">東京駅</option>
              <option value="2">横浜駅</option>
            </select>
          </div>
          <div className="field">
            <label htmlFor="">
              <i className="car icon"> </i>車での移動時間の上限
            </label>
            <select name="dropdown" id="" className="ui dropdown">
              <option value="60">60分</option>
              <option value="90">90分</option>
              <option value="120">120分</option>
            </select>
          </div>
          <div className="Search__Button">
            <button type="submit" className="Search__Button__Design">
              <i className="search icon"> </i>ゴルフ場を検索する
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Home
