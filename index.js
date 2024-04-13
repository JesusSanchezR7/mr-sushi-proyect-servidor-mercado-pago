import express from "express";
import cors from "cors";


// SDK de  mercado pago 
import { MercadoPagoConfig, Preference } from "mercadopago";

const client = new MercadoPagoConfig({
    accessToken: 'APP_USR-2877916831208277-031302-01f92eb3145f78f1508bc36e6b883c60-1726171220',
});

const app = express();
const port = 3000;

//app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Encendido Server");
});

app.post("/create_prefernece", async (req, res) => {
    try {
        const body = {
            items: [
                {
                    title: req.body.title,
                    quantity: Number(req.body.quantity),
                    unit_price: Number(req.body.price),
                },
            ],
            back_urls:{
                success: "http://localhost:5173/menu",
                failure: "http://localhost:5173/menu",
                pending: "http://localhost:5173/menu",
            },
            auto_return: "approved",
         };

    const preference = new Preference(client);
    const result = await preference.create({body});
   
    res.json({
        id: result.id,
    });

    } catch (error) {
    console.log(error);
    res.status(500).json({
        error: "Error al creear la preferencia",
    });
   
  }
});

app.listen(port, () => {
    console.log(`EL servidor esta corriendo en el puerto ${port}`);
});
