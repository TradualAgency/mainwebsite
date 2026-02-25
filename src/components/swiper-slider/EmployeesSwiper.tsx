'use client';
// components/EmployeeSlider.tsx
import { type SanityDocument } from '@sanity/client';
import { urlFor } from '@/sanity/lib/image';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

interface EmployeeSliderProps {
    serializedEmployees: string;
}

export default function EmployeeSlider({ serializedEmployees }: EmployeeSliderProps) {
    // Parse the serialized employees data
    const employees: SanityDocument[] = JSON.parse(serializedEmployees);

    return (
        <Swiper
            modules={[Navigation]}
            spaceBetween={50}
            slidesPerView={2.5}
            navigation
            breakpoints={{
                320: {
                    slidesPerView: 1.2,
                    spaceBetween: 20
                },
                768: {
                    slidesPerView: 2.2,
                    spaceBetween: 40
                },
                1024: {
                    slidesPerView: 2.5,
                    spaceBetween: 50
                }
            }}
        >
            {employees.map((employee) => (
                <SwiperSlide key={employee._id}>
                    <div className="w-full">
                        <div>
                            <img
                                className="w-full h-[400px] object-cover rounded-2xl"
                                src={urlFor(employee.image).url()}
                                alt={employee.name || "Employee"}
                            />
                        </div>
                        <div className="mt-5">
                            <p className="text-xl font-geologica text-secondary">{employee.name}</p>
                            <p className="font-geologica text-secondary">{employee.functie}</p>
                        </div>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
}