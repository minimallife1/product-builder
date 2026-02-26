import React, { useState } from 'react';
import { getRecommendations } from './recommendations'; // Assuming recommendations.js will export this

function App() {
  const [ageMonths, setAgeMonths] = useState('');
  const [gender, setGender] = useState('');
  const [developmentalStage, setDevelopmentalStage] = useState('');
  const [recommendations, setRecommendations] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRecommendations = getRecommendations({ ageMonths: parseInt(ageMonths), gender, developmentalStage });
    setRecommendations(newRecommendations);
  };

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">👶 육아템 추천 서비스 🍼</h1>
      <div className="card p-4 shadow-sm mb-5">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="ageMonths" className="form-label">아기 개월 수:</label>
            <input
              type="number"
              className="form-control"
              id="ageMonths"
              value={ageMonths}
              onChange={(e) => setAgeMonths(e.target.value)}
              min="0"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="gender" className="form-label">성별:</label>
            <select
              className="form-select"
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">선택 안 함</option>
              <option value="male">남자</option>
              <option value="female">여자</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="developmentalStage" className="form-label">발달 단계:</label>
            <select
              className="form-select"
              id="developmentalStage"
              value={developmentalStage}
              onChange={(e) => setDevelopmentalStage(e.target.value)}
            >
              <option value="">선택 안 함</option>
              <option value="newborn">신생아 (0-1개월)</option>
              <option value="neckControl">목 가누기 (2-3개월)</option>
              <option value="sitting">앉기 (4-6개월)</option>
              <option value="crawling">배밀이/기기 (7-9개월)</option>
              <option value="standing">잡고 서기/걷기 (10-12개월)</option>
              <option value="walking">걷기 (13-18개월)</option>
              <option value="talking">말 배우기 (19-24개월)</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary w-100">육아템 추천 받기</button>
        </form>
      </div>

      {recommendations.length > 0 && (
        <div className="mt-5">
          <h2 className="text-center mb-4">✨ 추천 육아템 ✨</h2>
          <div className="row">
            {recommendations.map((item, index) => (
              <div key={index} className="col-md-6 col-lg-4 mb-4">
                <div className="card h-100 shadow-sm">
                  <img src={item.imageUrl} className="card-img-top" alt={item.name} style={{ height: '200px', objectFit: 'cover' }} />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{index + 1}. {item.name}</h5>
                    <p className="card-text">{item.description}</p>
                    <div className="mt-auto">
                      <a href={item.purchaseLink} target="_blank" rel="noopener noreferrer" className="btn btn-success btn-sm w-100">
                        🛒 최저가 구매하기
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
