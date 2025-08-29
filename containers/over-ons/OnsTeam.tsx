// components/OurTeam.tsx
import React from "react";
import EmployeesSwiper from "@/components/swiper-slider/EmployeesSwiper";

type OurTeamProps = {
    employees: any[]; // pas aan naar je echte type als je die hebt
};

export default function OurTeam({ employees }: OurTeamProps) {
    return (
        <section className="py-12 ml-6 px-6 my-20 bg-secondary/10 rounded-lg">
            <div className="max-w-7xl mx-auto">
                <div>
                    <p className="text-secondary font-geologica text-xl mb-6">Ons Team</p>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-geologica text-secondary">
                        Gedreven experts met één missie: jouw merk laten groeien
                    </h2>
                </div>

                <div className="mt-10 flex flex-col md:grid md:grid-cols-3 gap-10">
                    <div className="col-span-1 flex items-center">
                        <p className="leading-8 text-secondary">
                            Bij Tradual draait alles om de mensen achter het werk.
                            Ons team bestaat uit technische specialisten, creatieve denkers en
                            datagedreven strategen die elke dag alles geven om impact te maken.
                            We combineren vakkennis met een creatieve mindset en de drive om
                            altijd beter te presteren. Samen bouwen we niet alleen webshops die
                            resultaat opleveren, maar ook langdurige partnerships met onze
                            klanten.
                        </p>
                    </div>

                    <div className="col-span-2">
                        <EmployeesSwiper serializedEmployees={JSON.stringify(employees)} />
                    </div>
                </div>
            </div>
        </section>
    );
}
