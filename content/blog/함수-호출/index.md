---
title: 초보자들이 자주 헷갈리는 함수 호출
date: "2023-08-21"
description: "함수 호출에 대해서 확실하게 짚어보자."
---

# 함수 선언과 함수 호출의 차이

```javascript
const add = (a, b) => a + b

document.querySelector("#header").addEventListener("click", add())
```

위 코드의 문제점은 무엇일까? 함수를 등록할 때, 함수를 호출 해버렸다. 이럴 경우, `#header`를 클릭하지도 않았는데 `add()` 함수가 작동한다. 이러한 경우를 **"함수가 호출되었다."** 라고 한다.

이러한 실수를 방지하기 위한 팁으로는 `()`가 보인다면 바로 그 함수의 `return` 값으로 대체해보면 된다.

```javascript
...
document.querySelector('#header').addEventListener
('click', undefined + undefined); // add()
```

함수를 등록할 때, `add()` 이러한 방식으로 작성하는 것은 함수를 등록하는 것이 아니라 **함수의 `return` 값을 넣는 것이다.** 그러므로 `return` 값으로 대체해보면 이러한 실수를 방지할 수 있다.

# 고차 함수

이제는 함수 이름에 `()`가 있다면 바로 `return` 값으로 대체해야한다는 것을 알았다. 코드가 아래와 같다면 어떨까?

```javascript
const onClick = () => console.log("hello")

document.querySelector("#header").addEventListener("click", onClick())
```

`header`를 클릭하기도 전에 `onClick`이 바로 실행될 것이다. 그리고 `return` 값은 `undefined`이므로 위 코드는 정상 작동하지 않는다. 하지만 위 코드를 정상 작동하게 하는 방법이 있다.

```javascript
const onClick = () => () => console.log("hello")

document.querySelector("#header").addEventListener("click", onClick())
// return () => console.log('hello');
```

`onClick`의 `return` 값이 함수이므로 위 코드는 정상 작동한다. 이와 같이 함수를 반환하는 함수를 **고차 함수**라고 한다.

## 고차 함수의 매개변수

```javascript
const onClick = (event?) => (event?) => console.log("hello")

document.querySelector("#header").addEventListener("click", onClick())
```

위와 같은 상황에서 `event` 매개변수를 사용하고 싶을 때, 어느 부분에 넣어야 하는지 헷갈릴 수 있다. 그럴 땐 지금까지 설명한 방식으로 하면 전혀 헷갈리지 않을 것이다. 아래 코드를 확인해보자.

```javascript
const onClick = () => event => console.log("hello")

document
  .querySelector("#header")
  .addEventListener("click", event => console.log("hello"))
// onClick()
```

함수 호출을 했을 경우, 함수의 `return` 값을 넣어주면 되기 때문에 위와 같이 작동한다. 이런 식으로 검증을 해보면 쉽게 코드를 작성할 수 있다.

# 결론

함수의 호출 `()`을 보면 바로 `return` 값으로 대체하여 검증해보자.
