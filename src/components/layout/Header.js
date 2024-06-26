import styled from "@emotion/styled";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { userInfoContext } from "../../context/UserInfoProvider";
// 정보수정, 로그아웃 아이콘
import { FiLogOut } from "react-icons/fi";
import { FaUserPen } from "react-icons/fa6";
import { getUserLogout } from "../../apis/user/userapi";

const Header = () => {
  const { contextUserData, setContextUserData } = useContext(userInfoContext);
  const [userSeq, setUserSeq] = useState();
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    setUserSeq(contextUserData?.userSeq);
  }, [contextUserData]);

  useEffect(() => {}, [userSeq]);

  // 로그아웃 처리 함수
  const handleLogout = async e => {
    e.preventDefault();
    const result = await getUserLogout();
    if (result.status === 200) {
      alert("로그아웃되었습니다.");
      sessionStorage.removeItem("user");
      setContextUserData(null);
      navigate("/");
    }
  };

  // useEffect(() => {
  //   setUserSeq(localUserData.userSeq);
  // }, [localUserData]);
  // useEffect(() => {
  //   console.log(userSeq);
  // }, [userSeq]);

  // 여기에 헤더를 제외하고 싶은 path를 넣으세요
  const excludedPaths = ["/", "/register", "/signup"];
  if (!excludedPaths.includes(location.pathname)) {
    return (
      <HeaderDiv>
        <h1>
          <Link to="/notice">
            {/* 로드 시에 로고 안사라지게 경로 잡아둠  */}
            <img src={`/www/images/plantDiaryLogo2.png`} alt="logo" />
          </Link>
        </h1>
        <ul className="menu">
          <li>
            <Link className="menu__item" to="/plantResisterList">
              식물등록
            </Link>
          </li>
          <li>
            <Link className="menu__item" to="/reactCalendar">
              식물관리
            </Link>
          </li>
          <li>
            <Link className="menu__item" to="/notice">
              커뮤니티
            </Link>
          </li>
        </ul>
        <ul>
          <li>
            {userSeq ? (
              <div className="user-actions">
                {/* css 다듬어야함. */}
                <Link className="action-item" to={"/userprofile"}>
                  <FaUserPen size={20} />
                </Link>
                /
                <button
                  className="action-item"
                  onClick={e => {
                    handleLogout(e);
                  }}
                >
                  로그아웃
                  <FiLogOut size={18} />
                </button>
              </div>
            ) : null}
          </li>
        </ul>
      </HeaderDiv>
    );
  } else {
    return <></>;
  }
};

export default Header;

const HeaderDiv = styled.div`
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--primary-100);
  h1 {
    width: 100px;
    img {
      width: 100%;
    }
  }
  ul {
    display: flex;
    align-items: center;
    gap: 30px;
    height: 100%;
    font-weight: 700;
    li {
      display: flex;
      align-items: center;
      height: 100%;
    }
  }
  .menu__item {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
  .user-actions {
    display: flex;
    align-items: center;
    gap: 10px; /* 간격 조정 가능 */
  }
  .action-item {
    font-size: 15px;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 5px;
  }
  .action-item button {
    font-weight: inherit;
    display: flex;
    align-items: center;
    gap: 5px;
  }
`;
