import { useState, useEffect } from 'react';

// 3. /{team}/messages/{id}/, /{team}/recipients/{id}/, /{team}/recipients/{recipient_id}/reactions/
// 4. url 가공 필요

// 기본 fetch에서 url, method, body을 받아 실행
const BASE_URL = 'https://rolling-api.vercel.app';

export default function useFetch(url, method = 'GET', body = null) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 통신 할 데이터 메소드와 헤더 지정
        const requestOptions = {
          method: method,
          headers: {
            'Content-Type': 'application/json',
          },
        };
        // body 유무 확인 조건부 추가
        if (body) {
          requestOptions.body = JSON.stringify(body);
        }

        // fetching 호출
        const response = await fetch(`${BASE_URL}${url}`, requestOptions);
        if (!response.ok) {
          throw new Error('서버 응답 실패');
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error(error);
        console.log(
          `서버와의 통신 과정에서 문제가 발생하였습니다. (fetch 확인)`,
        );
      }
    };

    fetchData();
  }, [url, method, body]);
  // url, method, body가 변경될 때마다 호출

  return data;
}

// const API = {
//   // GET: 리소스 조회
//   get: async (url) => {
//     return await useFetch(url, 'GET');
//   },
//   // POST: 요청 데이터 처리, 주로 등록에 사용
//   post: async (url, body) => {
//     return await useFetch(url, 'POST', body);
//   },
//   // PATCH: 리소스 부분 변경
//   patch: async (url, body) => {
//     return await useFetch(url, 'PATCH', body);
//   },
//   // PUT: 리소스 덮어쓰기 혹은 생성
//   put: async (url, body) => {
//     return await ussFetch(url, 'PUT', body);
//   },
//   // DELETE: 리소스 삭제
//   delete: async (url) => {
//     return await useFetch(url, 'DELETE');
//   },
// };
