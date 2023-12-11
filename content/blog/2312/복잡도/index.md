---
title: 함수를 나눠도 코드가 복잡한 이유
date: "2023-12-11"
description: "복잡도에 대해 이해하고 코드에 적용해보며 느낀 점을 공유합니다."
---

원티드 프리온보딩 12월 챌린지에서 알게 된 개념을 정리해보고자 합니다.

복잡도란 무엇일까요? 저와 같은 신입 개발자분들에게는 생소할 수도 있는 개념인데요. 이번 포스팅에서는 복잡도의 개념과 이를 해결하기 위한 방안과 해결 방안을 적용 해보고 느낀 점을 공유해드리려고 합니다.

## 복잡도

프로그래밍에서의 복잡도는 말 그대로 **코드의 복잡함의 정도** 라고 보시면 되겠습니다. 현재 다양한 프로그래밍 기법들이 사용되고 있는데요. 객체 지향, 함수형 프로그래밍, 선언형 프로그래밍, 디자인 패턴 등의 기법들은 복잡도를 통제하기 위한 방안들이라고 해도 과언이 아닙니다.

이러한 기법들은 클린 코드에서도 많이 언급되는 내용들인데, 그래서 저는 **클린 코드와 복잡도의 통제는 같은 개념** 이며 많은 개발자 분들이 클린 코드에 목매는 이유도 이러한 이유 때문이라고 생각합니다.

그럼 왜 복잡해질까요?

왜냐하면 프로덕트가 얼만큼 복잡해질지 개발자는 알 수가 없어 **최적의 구조를 미리 정할 수 없기 때문**에 코드가 점점 복잡해지는 것입니다. 이해하기 쉽도록 예시를 들어보겠습니다.

일반 도시(City)와 계획 도시(Planned City)의 특징들을 아시나요? 서울, 도쿄 등의 일반 도시들은 자연적으로 발생했기 때문에 구역도 명확하지 않고 굉장히 복잡합니다. 하지만 뉴욕, 바르셀로나 등의 계획 도시들은 구획마다 경계가 확실하고 바둑판을 연상시키듯 일목요연하죠.

저희가 만드는 프로덕트는 보통 일반 도시의 특징을 따라갑니다. 끝이 정해지지 않고 코드가 덕지덕지 붙는 것이죠.

또 다른 문제도 있습니다. 바로 자원이 한정적이라는 것입니다.

우리는 항상 한정된 자원들을 가지고 안정적으로 기능을 만들어가야합니다. 완벽한 상태로 시작할 수는 없습니다. 완벽한 상태로 시작한다는 말은 안하겠다는 말과 다름 없습니다. 그렇기에 항상 제한된 상황이라는 것을 인지하고 그에 맞게 자원을 잘 분배해야합니다.

제한된 상황에서 많은 일에 신경을 쓰면 당연히 개발에 진전이 없겠죠. 그렇기에 우리는 **일을 줄이는 일**을 해야합니다.

> 이미 복잡해진 코드를 수정하는 일의 비용(시장 기회, 개발자의 인건비 등)은 기하급수적으로 증가하고, 방치할 수록 많은 이자를 지불해야 하기 때문에 틈틈이 “일을 줄이는 일”을 해야 한다.

> 일을 줄이는 일이란 빠르게 코드를 이해할 수 있는 코드 구조를 만들고, 하나의 수정 사항으로 인하여 다른 코드에 미치는 영향을 줄이는 것이다.

## 복잡도 개선해보기

함수를 무조건 나눈다고 그것이 좋은 코드가 되지는 않습니다. 마땅한 기준을 정하고 일관되게 나누어야겠죠. 그러면 어떻게 나누면 될까요?

기본적으로 **데이터, 계산, 액션**을 기준으로 구분하면 됩니다. 간단하게 개념 정의를 해보겠습니다.

- 데이터 : 이벤트에 대한 사실. 문자열, 객체 등
- 계산 : 입력으로 얻은 출력. 순수 함수, 수학 함수 등
- 액션 : 외부 세계와 소통하는 함수. fetchData, 이메일 보내기 등

데이터, 계산으로부터 가급적 액션을 분리하고, 가급적 계산을 사용하며 액션으로부터 계산을 추출할 수 있다면 그렇게 하는 편이 좋습니다.

아래는 Tweet을 게시하는 훅입니다.

```typescript
export default function usePostTweet() {
  const [isLoading, setIsLoading] = useState(false);
  const [tweet, setTweet] = useState("");
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (file && file?.size > 1024 * 1024) {
      alert("1MB 미만 크기의 파일만 업로드 가능합니다.");
      setFile(null);
    }
  }, [file]);
  const handleTweetChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTweet(e.target.value);
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files.length === 1) setFile(files[0]);
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = auth.currentUser;
    const date = new Date();

    if (!user || isLoading || tweet === "" || tweet.length > 180) return;

    try {
      setIsLoading(true);
      const doc = await addDoc(collection(db, "tweets"), {
        tweet,
        createdAt: Date.now(),
        postedAt: { month: date.getMonth() + 1, day: date.getDate() },
        username: user.displayName || "익명",
        userId: user.uid,
        userEmail: user.email?.split("@")[0],
        profilePicture: user.photoURL,
      });

      if (file) {
        const locationRef = ref(storage, `tweets/${user.uid}/${doc.id}`);
        const uploaded = await uploadBytes(locationRef, file);
        const url = await getDownloadURL(uploaded.ref);
        await updateDoc(doc, { photo: url });
      }

      setTweet("");
      setFile(null);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    tweet,
    file,
    handleTweetChange,
    handleFileChange,
    handleSubmit,
  };
}
```

주어진 컴포넌트를 한 번 분석해보겠습니다.

1. 데이터
   - `isLoading`, `tweet`, `file`: 컴포넌트의 상태를 관리하는 데이터입니다.
2. 계산
   - `useEffect`: 파일 사이즈를 확인하여 1MB 이상이면 알림을 띄우고 파일 상태를 업데이트합니다.
   - `postedAt: { month: date.getMonth() + 1, day: date.getDate() }` : Tweet 게시 날짜를 계산합니다.
3. 액션
   - `handleTweetChange`: 트윗 내용이 변경될 때 호출되는 액션입니다.
   - `handleFileChange`: 파일이 변경될 때 호출되는 액션입니다.
   - `handleSubmit`: 폼 제출 시 호출되는 액션으로, 서버에 데이터를 저장하고 상태를 업데이트합니다.

그럼 이제 계산 카테고리를 컴포넌트 바깥으로 분리해보겠습니다.

```typescript
// 계산 파트 분리
const validateFileSize = (file: File | null) => {
  if (file && file.size > 1024 * 1024) {
    alert("1MB 미만 크기의 파일만 업로드 가능합니다.");
    return null;
  }
  return file;
};
const formatTweetDate = (date: Date) => ({
  month: date.getMonth() + 1,
  day: date.getDate(),
});

export default function usePostTweet() {
  const [isLoading, setIsLoading] = useState(false);
  const [tweet, setTweet] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleTweetChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTweet(e.target.value);
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files.length === 1) setFile(files[0]);
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = auth.currentUser;
    const date = new Date();

    if (!user || isLoading || tweet === "" || tweet.length > 180) return;

    try {
      setIsLoading(true);
      const doc = await addDoc(collection(db, "tweets"), {
        tweet,
        createdAt: Date.now(),
        // 계산 함수 사용
        postedAt: formatTweetDate(date),
        username: user.displayName || "익명",
        userId: user.uid,
        userEmail: user.email?.split("@")[0],
        profilePicture: user.photoURL,
      });

      // 계산 함수 사용
      const validFile = validateFileSize(file);

      if (validFile) {
        const locationRef = ref(storage, `tweets/${user.uid}/${doc.id}`);
        const uploaded = await uploadBytes(locationRef, validFile);
        const url = await getDownloadURL(uploaded.ref);

        await updateDoc(doc, { photo: url });
      }

      setTweet("");
      setFile(null);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    tweet,
    file,
    handleTweetChange,
    handleFileChange,
    handleSubmit,
  };
}
```

계산 카테고리에 있는 코드들은 컴포넌트 밖으로 분리해보았습니다. `validateFileSize` 덕분에 `useEffect`를 사용하지 않아도 작동하는 모습입니다. 또한 `formatTweetDate`를 사용하여 가독성이 더욱 좋아졌습니다.

데이터 부분도 분리 해볼 수 있지만, 부수 효과를 지녔기 때문에 조심히 다뤄야하므로 이번엔 넘어가도록 하겠습니다.

## 느낀 점

강의 내용이 너무나 좋아서 해당 내용을 꼭 적용해보고 기록해두고 싶었습니다. 직접 해보니 분리하는 작업이 생각보다 어려웠지만, 굉장히 재미있었습니다.

'컴포넌트가 유의미하게 변경됐는가' 는 잘 모르겠지만, 역할을 구분해보니 코드가 눈에 더 들어오고 '이건 나눌 수 있겠는데?' 라는 생각이 드는 부분들도 보이기 시작했습니다. '이렇게 점점 성장해가는 것이 아닐까' 하는 생각이 드는 하루였습니다.
