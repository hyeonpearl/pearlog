---
title: React, 제대로 이해했니? - 기초편
date: "2023-05-19"
description: "이해하고 쓰는거 맞아?"
---

최근 내가 작성한 코드를 직접 리뷰해보았다. 코드가 굉장히 난잡하고 나조차도 잘 읽혀지지 않는 코드를 작성하고 있었다. 과연 나 스스로 React 개발자라고 할 수 있을까? 그냥 제일 많이 쓰니까, 회사에서 React 개발자를 뽑으니까 시작했는데 이대로는 안될 것 같다는 생각에 기초부터 차근차근 다시 보려한다.

오늘은 기초편으로 React가 무엇이고 무슨 특징이 있는지 간단하게 알아보자.

# React란?

우선 공식 문서를 찾아보았다.

> React는 사용자 인터페이스(UI)를 렌더링하기 위한 JavaScript 라이브러리입니다. UI는 버튼, 텍스트, 이미지와 같은 작은 요소로 구성됩니다. React를 통해 **작은 요소들을 재사용 가능하고 중첩할 수 있는 컴포넌트로 조합**할 수 있습니다. 웹 사이트에서 휴대전화 앱에 이르기까지 화면에 있는 모든 것을 컴포넌트로 나눌 수 있습니다.

아래는 Velopert님의 _리액트를 다루는 기술_ 에서 발췌하였다.

> React는 자바스크립트 라이브러리로 UI를 만드는데 사용한다. MVC, MVW 등의 아키텍쳐를 사용하는 다른 프레임워크들과 달리 **오직 V(View)만 신경 쓰는 라이브러리**이다. React 프로젝트에서는 특정 부분이 어떻게 생길지 정하는 선언체가 있는데, 이를 컴포넌트라고 한다.

위 설명들을 보면 컴포넌트라는 것을 사용하여 UI를 만드는 것이 주된 목적인 것 같다.

그럼 무슨 특징이 있는지 살펴보자.

# Component

> 작은 요소들을 재사용 가능하고 중첩할 수 있는 컴포넌트로 조합

재사용이 가능한 각각의 독립된 모듈을 컴포넌트라고 한다.
우리가 UI를 보다보면 반복되는 요소들이 아주 많은 것을 알 수 있다.

<!-- ![](https://velog.velcdn.com/images/hyeonpearl/post/eb6fb4e3-dcd5-4609-8f04-de7a5fd2d9cd/image.png) -->

로고 아래 탭 메뉴도 그렇고 게시물도 같은 형식으로 구성되어있다. 저 각각의 요소들을 직접 코딩하는 것이 아니라 컴포넌트로 만들고 조합하여 페이지를 만들어 나간다.

React 컴포넌트는 마크업을 얹을 수 있는 JavaScript 함수다. 컴포넌트는 버튼과 같이 작을 수도 있고 전체 페이지와 같이 큰 경우도 있다. 직접 코드를 한 번 보자.

```jsx
function Profile() {
  return <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" />
}

export default function Gallery() {
  return (
    <section>
      <h1>Amazing scientists</h1>
      <Profile />
      <Profile />
      <Profile />
    </section>
  )
}
```

코드를 보면 Gallery 컴포넌트는 세 개의 Profile 컴포넌트를 렌더링하고 있다.
이런 식으로 조합해서 사용할 수 있다.

# JSX

Web은 HTML, CSS, JavaScript를 기반으로 만들어져 왔다. 수년 동안 웹 개발자는 HTML로 내용을, CSS로 디자인을, JavaScript로 로직을 작성해 왔다. 보통은 HTML, CSS, JavaScript를 분리된 파일로 관리했는데, Web이 더욱 인터랙티브해지면서, 로직이 내용을 결정하는 경우가 많아졌고, 그래서 JavaScript가 HTML을 담당하게 되었다. 이것이 바로 React에서 렌더링 로직과 마크업이 같은 위치에 함께 있게 된 이유이다. 즉, 컴포넌트에서 말이다.

```jsx
export default function TodoList() {
  const onClick = () => {...} // 자바스크립트 로직
  return ( // 마크업
    <>
      <h1>Hedy Lamarr's Todos</h1>
      <img
        src="https://i.imgur.com/yXOvdOSs.jpg"
        alt="Hedy Lamarr"
        className="photo"
      />
      <ul>
        <li>Invent new traffic lights</li>
        <li>Rehearse a movie scene</li>
        <li>Improve the spectrum technology</li>
      </ul>
    </>
  );
}
```

## JSX 규칙

### 1. 하나의 루트 엘리먼트로 반환하기

한 컴포넌트에서 여러 엘리먼트를 반환하려면, 하나의 부모 태그로 감싸주어야한다.
예를 들어 `<div>`를 활용할 수 있다.

```jsx
return (
  <div>
    <h1>Hedy Lamarr's Todos</h1>
    <img
      src="https://i.imgur.com/yXOvdOSs.jpg"
      alt="Hedy Lamarr"
      className="photo"
    />
    <ul>
      <li>Invent new traffic lights</li>
      <li>Rehearse a movie scene</li>
      <li>Improve the spectrum technology</li>
    </ul>
  </div>
)
```

마크업에 `<div>`를 사용하고 싶지 않다면 `<></>`로 대체하면 된다.
이 빈 태그는 Fragment라고 한다.

```jsx
return (
  <>
    <h1>Hedy Lamarr's Todos</h1>
    <img
      src="https://i.imgur.com/yXOvdOSs.jpg"
      alt="Hedy Lamarr"
      className="photo"
    />
    <ul>
      <li>Invent new traffic lights</li>
      <li>Rehearse a movie scene</li>
      <li>Improve the spectrum technology</li>
    </ul>
  </>
)
```

### 2. 모든 태그는 꼭 닫아주기

`<img>` 태그와 같이 자체적으로 닫아주는 태그는 반드시 `<img />` 형태로 작성되어야한다.

### 3. 어트리뷰트는 캐멀 케이스로

JSX는 JavaScript로 바뀌고 JSX에서 작성된 어트리뷰트는 JavaScript 객체의 키가 된다. 컴포넌트에서는 종종 어트리뷰트를 변수로 읽고 싶은 경우가 있다. 그러나 JavaScript는 변수명에 제한이 있는데 예를 들면, 변수명에 대시를 포함하거나 class처럼 예약어를 사용할 수 없다.

그래서 React에서 HTML과 SVG의 어트리뷰트 대부분이 캐멀 케이스로 작성된다. 예를 들면, stroke-width 대신 strokeWidth로, class는 예약어이기 때문에, React에서는 DOM의 프로퍼티의 이름을 따서 className으로 대신 작성한다.

# Virtual DOM

React의 주요 특징 중에 하나는 Virtual DOM을 사용하는 것이다.

## DOM이란?

Virtual DOM을 알아보기 전에 DOM부터 짚고 넘어가자. DOM은 Document Object Model의 약어로, 객체로 문서 구조를 표현하는 방법이다. 보통 XML이나 HTML로 작성한다. 브라우저는 DOM을 활용해서 객체에 자바스크립트와 CSS를 적용하는데 DOM은 트리 형태라서 특정 노드에 대한 작업을 할 수 있다.
DOM에 변화가 생기면 웹 브라우저가 CSS를 다시 연산하고, 레이아웃을 구성하고, 페이지를 리페인트한다.

<!-- ![](https://velog.velcdn.com/images/hyeonpearl/post/37b152a8-7448-4e59-a4b9-a44673f3c9dd/image.png) -->

DOM API는 수많은 플랫폼과 브라우저에서 사용하는데, 치명적인 문제점이 한 가지 있다. 바로 동적 UI에 최적화되어 있는 않은 것이다. HTML은 정적이고, 자바스크립트를 통해 동적으로 만들 수 있는데 대규모 애플리케이션에 경우, 엄청난 양의 데이터가 로딩된다. 이런 상황에서 DOM에 직접 접근하여 변화를 주면 성능이 점점 안좋아지는데, 이를 해결하기 위해 나온 것이 **Virtual DOM**이다.

## Virtual DOM

Virtual DOM은 실제 DOM에 접근하는 것이 아니라, 이를 추상화한 자바스크립트 객체를 구성하여 사용한다. 간단하게 DOM을 복사한 것이라고 생각하자.

React에서는 다음과 같은 절차로 DOM을 업데이트한다.

1. 데이터를 업데이트하면 전체 UI를 Virtual DOM에 리렌더링한다.
2. 이전 Virtual DOM과 현재 내용을 비교한다.
3. 바뀐 부분만 실제 DOM에 적용한다.

그렇다고 Virtual DOM이 항상 빠른가? 그건 아니다.

리액트 메뉴얼을 보면 바로 이해할 수 있다.

> 우리는 다음 문제를 해결하기 위해 리액트를 만들었습니다.
> **지속적으로 데이터가 변화하는 대규모 애플리케이션 구축**

단순한 정적인 페이지로 구성된 사이트라면 리액트를 쓰지 않는 것이 더 효율이 좋을 수 있다.
