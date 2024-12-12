
interface LogoProps {
    widthLogo: string;
    heightLogo: string;
}

export default function Logo({widthLogo, heightLogo} : LogoProps) {

    return (

        <img 
            src="../src/assets/Imagen1.jpg"
            alt="Logotipo U.E Carlos Finlay"
            className={`rounded-full ${widthLogo} ${heightLogo}`}
        />

    );

}