import React from 'react'
import './Commentaire.css'
export default function Commentaire() {
  return (
    <div className='Commentaire mt-8'>
      <div className="container bootdey">
        <h2>Commentaires</h2>
  <div className="col-md-12 bootstrap snippets">
    <div className="panel">
      <div className="panel-body">
        <textarea className="form-control" rows="2" placeholder="Votre Message"></textarea>
        <div className="mar-top clearfix">
          <button className="btn btn-sm btn-primary pull-right" type="submit">
            <i className="fa fa-pencil fa-fw"></i> envoyer
          </button>
        
        </div>
      </div>
    </div>
    <div className="panel">
      <div className="panel-body">
     
        {/*===================================================*/}
        <div className="media-block">
          <a className="media-left" href="#">
            <img className="img-circle img-sm" alt="Profile Picture" src="https://bootdey.com/img/Content/avatar/avatar1.png" />
          </a>
          <div className="media-body">
            <div className="mar-btm">
              <a href="#" className="btn-link text-semibold media-heading box-inline"> Lisa D.</a>
              <p className="text-muted text-sm">
                11 min ago
              </p>
            </div>
            <p>
              consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
              Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
            </p>
        
            <hr />
           
            <div>
       
            </div>
          </div>
        </div>


        
     
     
      </div>
    </div>
  </div>
</div>

    </div>
  )
}
