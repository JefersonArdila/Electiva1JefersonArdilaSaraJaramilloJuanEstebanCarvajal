import { Contenedor } from "./stylesClonApp";

export const ClonApp = ({ onNavigate }) => {
  return (
    <>
      <div>
        <Contenedor>
          <div className="container1">
            <img
              className="XLogo"
              src="https://cdn-3.expansion.mx/dims4/default/f08f00d/2147483647/strip/true/crop/1920x1080+0+0/resize/1200x675!/format/webp/quality/60/?url=https%3A%2F%2Fcdn-3.expansion.mx%2F58%2F66%2Fdb5de50f4ab4970bed8ab24d7aae%2Ftwitter-logo-x.jpg"
            />
          </div>
          <div className="container2">
            <h1 className="h1Login">
              <strong>
                Lo que está <br /> pasando ahora
              </strong>
            </h1>
            <h3 className="h3Login">Únete Hoy</h3>
            <div className="contenedorbtn">
              <button className="btn-Google" onClick={""}>
                Google
              </button>
            </div>
            <div className="contenedorbtn">
              <button className="btn-CreateAccount" onClick={""}>
                Crear Cuenta
              </button>
            </div>
            <h6 className="h6Login">
              Al registrarte, aceptas los{" "}
              <a href="https://x.com/es/tos" target="_blank">
                Términos de servicio
              </a>{" "}
              y la{" "}
              <a href="https://x.com/es/privacy" target="_blank">
                {" "}
                Política <br />
                de privacidad{" "}
              </a>
              , incluida la política de{" "}
              <a
                href="https://help.x.com/es/rules-and-policies/x-cookies"
                target="_blank"
              >
                {" "}
                Uso de Cookies
              </a>
              .
            </h6>
            <h5 className="h5Login">¿Ya tienes una cuenta?</h5>
            <div className="contenedorbtn">
              <button className="btn-Login" onClick={onNavigate}>
                Iniciar Sesión
              </button>
            </div>
          </div>
        </Contenedor>
      </div>
    </>
  );
};
