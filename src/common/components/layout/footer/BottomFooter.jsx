import Container from "../../shared/Container";
import Typography from "../../Typography";

const BottomFooter = () => {
    return (
        <div className="h-screen w-full bg-foreground ">
            <Container className="flex items-center justify-center">
                <Typography.Title1 className="text-center text-background text-pretty">
                    Thank you for visiting Northern Handicrafts! We appreciate your support for local artisans and their beautiful creations Stay connected with us for the latest updates and exclusive offers.
                </Typography.Title1>
            </Container>
        </div>
    );
};

export default BottomFooter;