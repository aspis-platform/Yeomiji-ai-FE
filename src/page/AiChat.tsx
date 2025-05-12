const LoadingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 10;
  gap: 20px;
  backdrop-filter: blur(2px);
  
  p {
    font-size: 18px;
    font-weight: 500;
    color: ${theme.color.main};
    margin-top: 20px;
  }
`;

const LoadingSpinner = styled.div`
  width: 60px;
  height: 60px;
  border: 6px solid rgba(87, 143, 202, 0.2);
  border-top: 6px solid ${theme.color.main};
  border-radius: 50%;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;import styled from "styled-components";
import { theme } from "../style/theme";
import cross from "../assets/cross.svg";
import StartView from "../components/main/StartView";
import JobView from "../components/main/JobView";
import HouseForm from "../components/main/HouseFormView";
import HouseOwnershipView from "../components/main/HouseOwnershipView";
import PersonalityView from "../components/main/PersonalityView";
import ActivityLevelView from "../components/main/ActivityLevelView";
import FamilyFormView from "../components/main/FamilyFormView";
import DogSizeView from "../components/main/DogSizeView";
import ResultView from "../components/Result/ResultView";
import { useSurvey } from "../context/SurveyContext";

const AiChat = () => {
  const { 
    currentStep, 
    setCurrentStep, 
    progressPercentage,
    loading,
    submitSurvey,
    clearSurvey
  } = useSurvey();

  const goToNext = () => {
    if (currentStep === 7) {
      // 마지막 단계에서 API 호출
      submitSurvey();
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const goBack = () => {
    setCurrentStep(currentStep - 1);
  };

  // 설문 취소 핸들러
  const handleCancel = () => {
    if (window.confirm('설문을 취소하시겠습니까? 모든 진행 상황이 초기화됩니다.')) {
      clearSurvey();
    }
  };

  const screenTexts = [
    {
      title: "당신과 잘 맞는 반려견을 찾아보세요",
      subtitle: "Ai가 당신에게 맞는 애견을 찾아드려요",
    },
    {
      title: "검사자님의 직업을 알려주세요",
      subtitle: "수집한 개인정보는 ai 모델에 전달되고 저장되지 않아요",
      progress: "단계 1/7",
      percentage: "14% 완료",
    },
    {
      title: "검사자님의 집 형태를 알려주세요",
      subtitle: "수집한 개인정보는 ai 모델에 전달되고 저장되지 않아요",
      progress: "단계 2/7",
      percentage: "28% 완료",
    },
    {
      title: "주택 소유 여부를 알려주세요",
      subtitle: "수집한 개인정보는 ai 모델에 전달되고 저장되지 않아요",
      progress: "단계 3/7",
      percentage: "42% 완료",
    },
    {
      title: "검사자님의 가족 형태를 알려주세요",
      subtitle: "수집한 개인정보는 ai 모델에 전달되고 저장되지 않아요",
      progress: "단계 4/7",
      percentage: "57% 완료",
    },
    {
      title: "검사자님의 성향을 알려주세요",
      subtitle:
        "반려견과의 일상을 함께할 때 가장 편안한 생활 패턴을 선택해주세요",
      progress: "단계 5/7",
      percentage: "71% 완료",
    },
    {
      title: "선호하는 반려견의 활동량을 알려주세요",
      subtitle: "반려견과의 일상을 함께할 때 가장 편안한 활동량을 선택해주세요",
      progress: "단계 6/7",
      percentage: "85% 완료",
    },
    {
      title: "선호하는 반려견의 크기를 알려주세요",
      subtitle: "반려견과의 일상을 함께할 때 가장 편안한 크기를 선택해주세요",
      progress: "단계 7/7",
      percentage: "100% 완료",
    },
    {
      title: "나와 잘 맞는 반려견은...",
    },
  ];

  return (
    <>
      <Section>
        <Container>
          <MainTitle>아스피스 AI 입양 매칭</MainTitle>
          <ChatBox>
            <Exit onClick={handleCancel}>
              <img src={cross} alt="" />
            </Exit>
            <Title>나에게 맞는 반려견 찾기</Title>
            {currentStep > 0 && currentStep < 8 && (
              <Progress>
                <Bar>
                  <GaugeBar gauge={progressPercentage} />
                </Bar>
                <SmallText>
                  <p>{screenTexts[currentStep].progress}</p>
                  <p>{screenTexts[currentStep].percentage}</p>
                </SmallText>
              </Progress>
            )}
            <ScrollableArea>
              <ChatContainer>
                <Text>
                  <Title>{screenTexts[currentStep].title}</Title>
                  <p>{screenTexts[currentStep]?.subtitle ?? ""}</p>
                </Text>
                <Main>
                  {currentStep === 0 && <StartView goToNext={goToNext} />}

                  {currentStep === 1 && (
                    <JobView goToNext={goToNext} goBack={goBack} />
                  )}

                  {currentStep === 2 && (
                    <HouseForm goToNext={goToNext} goBack={goBack} />
                  )}

                  {currentStep === 3 && (
                    <HouseOwnershipView goToNext={goToNext} goBack={goBack} />
                  )}

                  {currentStep === 4 && (
                    <FamilyFormView goToNext={goToNext} goBack={goBack} />
                  )}

                  {currentStep === 5 && (
                    <PersonalityView goToNext={goToNext} goBack={goBack} />
                  )}

                  {currentStep === 6 && (
                    <ActivityLevelView goToNext={goToNext} goBack={goBack} />
                  )}

                  {currentStep === 7 && (
                    <DogSizeView goToNext={goToNext} goBack={goBack} />
                  )}

                  {currentStep === 8 && <ResultView />}
                  
                  {loading && (
                    <LoadingOverlay>
                      <LoadingSpinner />
                      <p>AI가 당신에게 맞는 반려견을 찾고 있어요...</p>
                    </LoadingOverlay>
                  )}
                </Main>
              </ChatContainer>
            </ScrollableArea>
          </ChatBox>
        </Container>
      </Section>
    </>
  );
};

const ScrollableArea = styled.div`
  flex: 1;
  overflow-y: auto;
`;
const Bar = styled.div`
  width: 100%;
  height: 6px;
  background-color: ${theme.color.gray2};
  border: none;
  border-radius: 10px;
  overflow: hidden;
`;
const GaugeBar = styled.div<{ gauge: number }>`
  width: ${(prop) => prop.gauge}%;
  height: 100%;
  background: linear-gradient(90deg, ${theme.color.main}, #4B6EAA);
  transition: width 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;
const SmallText = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 15px;
  font-weight: 700;
  color: ${theme.color.gray1};
`;
const Progress = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
const Main = styled.div`
  width: 100%;
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: flex-start;
  overflow: hidden;
  overflow-y: auto;
`;
const Text = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  font-size: 16px;
  font-weight: 400;
  color: ${theme.color.gray1};
`;
const ChatContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`;
const Title = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: #333;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateX(5px);
  }
`;
const Exit = styled.div`
  img {
    width: 32px;
    height: 32px;
    transition: transform 0.3s ease;
  }
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.9);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    background-color: rgba(240, 240, 240, 0.9);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    
    img {
      transform: rotate(90deg);
    }
  }
`;
const ChatBox = styled.div`
  width: 600px;
  height: 720px;
  border-radius: 24px;
  box-shadow: 0 10px 30px rgba(87, 143, 202, 0.2);
  padding: 40px;
  display: flex;
  flex-direction: column;
  gap: 32px;
  position: relative;
  overflow: hidden;
  background-color: white;
  animation: fadeIn 0.8s ease-in-out;
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
const MainTitle = styled.h1`
  font-size: 36px;
  font-weight: 700;
  color: #333;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
  background: linear-gradient(120deg, #578FCA, #4B6EAA);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: slideDown 1s ease-in-out;
  
  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 52px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;
const Section = styled.section`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background-color: #f9fafc;
`;

export default AiChat;
