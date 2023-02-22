import React, { Key, useState } from 'react'
import './Common.css'

import DatePicker, { registerLocale } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import addDays from 'date-fns/addDays'
import ja from 'date-fns/locale/ja'

import axios from 'axios'
import Result from './Result'
import Loading from './Loading'

export type Plan = {
  plan_id: Key
  image_url: string
  course_name: string
  duration: string
  price: string
  evaluation: string
  prefecture: string
  plan_name: string
  caption: string
  reserve_url_pc: string
}
const Home = () => {
  const Today = new Date()
  const [date, setDate] = useState<Date>(Today)
  const [budget, setBudget] = useState<number>(8000)
  const [departure, setDeparture] = useState<number>(1)
  const [duration, setDuration] = useState<number>(60)
  const [plans, setPlans] = useState<Plan[]>([])
  const [plansCount, setPlansCount] = useState<number | undefined>()
  const [hasError, setHasError] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  registerLocale('ja', ja)

  const onFormSubmit = async (event: { preventDefault: () => void }) => {
    try {
      event.preventDefault()

      setLoading(true)
      const response = await axios.get(
        'https://l1kwik11ne.execute-api.ap-northeast-1.amazonaws.com/production/golf-courses',
        {
          params: {
            date: addDays(date, 14),
            budget: budget,
            departure: departure,
            duration: duration,
          },
        }
      )
      setPlans(response.data.plans)
      setPlansCount(response.data.plansCount)

      setLoading(false)
    } catch (e) {
      console.log(e)
      setHasError(true)
    }
  }

  return (
    <div className="ui container" id="container">
      <div className="Search__Form">
        <form className="ui form segment" onSubmit={onFormSubmit}>
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
            <select
              name="dropdown"
              id=""
              className="ui dropdown"
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
            >
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
            <select
              name="dropdown"
              id=""
              className="ui dropdown"
              value={departure}
              onChange={(e) => setDeparture(Number(e.target.value))}
            >
              <option value="1">東京駅</option>
              <option value="2">横浜駅</option>
            </select>
          </div>
          <div className="field">
            <label htmlFor="">
              <i className="car icon"> </i>車での移動時間の上限
            </label>
            <select
              name="dropdown"
              id=""
              className="ui dropdown"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
            >
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

        <Loading loading={loading} />

        <Result plans={plans} plansCount={plansCount} error={hasError} />
      </div>
    </div>
  )
}

export default Home
