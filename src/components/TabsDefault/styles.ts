import styled from "styled-components";

export const Container  = styled.div`

    //adicionar stylos


/* Tab Container */
.Tabs {
  width: 100%;
  /* height: auto; */
  /* min-height: 400px; */
  /* margin: 3.5rem auto 1.5rem; */
  /* padding: 2rem 1rem; */
  color: #B4B8C5;
  border-radius: 2rem;

  @media (max-width: 769px) {
    padding: 2rem 0;
  }
}

/* Tab Navigation */
ul.nav {
  width: 60%;
  /* margin: 0 auto 2rem; */
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #B4B8C5;
  margin-bottom:1rem ;
  /* overflow-x:scroll; */

  @media (max-width: 768px) {
    width: 90%;
  }
}

ul.nav li {
  width: 50%;
  padding: .5rem;
  /* list-style: none;
  text-align: center; */
  cursor: pointer;
  transition: all 0.7s;
  border-bottom: 1px;
  font-weight: bold;
  /* border-top-left-radius: 2rem; */
}

ul.nav li:nth-child(2) {
  border-radius: 0;
  border-bottom: 1px;
  color: "#B4B8C5";
  font-weight: bold;
}

ul.nav li:hover {
  background: rgba(5, 220, 196, 0.1);
}

ul.nav li.active {
  font-weight: bold;
  color: ${props=>(props.theme.title ==='dark' ? props.theme.colors.textLabel: props.theme.colors.primary)};
  border-bottom: 1px solid ${props=>(props.theme.title ==='dark' ? props.theme.colors.textLabel: props.theme.colors.primary)};
}

@media screen and (max-width: 40em) {
    //adicionar o stylo responsivo
}

`;

