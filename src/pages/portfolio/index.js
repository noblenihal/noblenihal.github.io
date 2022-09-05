import React, {useState, useEffect} from "react";
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Container, Row, Col } from "react-bootstrap";
import { dataportfolio, meta } from "../../content_option";

export const Portfolio = () => {

  const [allTags, setAllTags] = useState(undefined)
  const [load, setLoad] = useState(true)
  const [filter, setFilter] = useState(false)
  const [projects, setProjects] = useState(undefined)


  useEffect(()=>{
    let temp = new Set();

    for(let project of dataportfolio){
      for(let tag of project.tags){
        temp.add(tag)
      }
    }

    setAllTags([...temp])
    setLoad(false)

  },[])

  const handleClickAll = (e) => {
    setFilter(false)
  }


  const handleClick = (e) => {
    const tag = e.target.value;
    let proj = dataportfolio.filter((item)=>{
      return item.tags.includes(tag)
    })
    setProjects(proj)
    setFilter(true)
  }

  return (load)?(<p>Loading...</p>):(
    <HelmetProvider>
      <Container className="About-header">
        <Helmet>
          <meta charSet="utf-8" />
          <title> Portfolio | {meta.title} </title>{" "}
          <meta name="description" content={meta.description} />
        </Helmet>
        <Row className="mb-5 mt-3">
          <Col lg="8">
            <h1 className="display-4 mb-4"> Portfolio </h1>{" "}
            <hr className="t_border my-4 ml-0 text-left" />
          </Col>
        </Row>

        <div className="tags mb-5">

          <button onClick={handleClickAll}>All</button>
          {
            allTags.map((tag, index)=>{
              return(
              <button onClick={handleClick} value={tag} key={index}>{tag}</button>
              )
            })
          }
        </div>
        { (filter)?(
        <div>
          {projects.map((data, i) => {
            return (
              <div key={i} className="po_item">
                <img src={data.img} alt="" height="300px" width="350px" />
                <div className="content">
                  <p>{data.desctiption}</p>
                  <a href={data.link}>view project</a>
                </div>
              </div>
            );
          })}
        </div>):
        (<div className="mb-5 po_items_ho">
          {dataportfolio.map((data, i) => {
            return (
              <div key={i} className="po_item">
                <img src={data.img} alt="" height="300px" width="350px" />
                <div className="content">
                  <p>{data.desctiption}</p>
                  <a href={data.link}>view project</a>
                </div>
              </div>
            );
          })}
        </div>)
        }
      </Container>
    </HelmetProvider>
  );
};
