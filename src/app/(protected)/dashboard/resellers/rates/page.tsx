"use client";
import { GetRates, updateRates } from "@/actions/rates/rates";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PageWrapper from "@/components/ui/pageWrapper";
import { useToast } from "@/lib/toast";
import { useEffect, useState } from "react";
const RatesPage = () => {
    const { toast } = useToast();
    const [rates, setRates] = useState({
        minimum: 0,
        maximum: 0
    });
    useEffect(() => {
        const fetchRates = async () => {
            const response = await GetRates()
            if (response.success) {
                setRates({
                    minimum: response.minimum,
                    maximum: response.maximum
                });
            }
        };
        fetchRates();
    }, []);
    const updateRate = async () => {
        const response = await updateRates(rates);
        if (response.success) {
            toast({
                title: "Success",
                description: "Rates have been successfully updated.",
                variant: "success",
            });
        } else {
            toast({
                title: "Error",
                description: response.message || "Failed to update rates.",
                variant: "destructive",
            });
        }
    }
    return (
        <PageWrapper>
            <p className="mb-5 font-bold">Resellers Markup Rate</p>
            <div className="flex flex-col gap-4">
                <div>
                    <label className="block mb-2">Minimum Rate</label>
                    <Input
                        aria-label="Minimum Rate"
                        value={rates.minimum}
                        onChange={(event) => {
                            setRates(prev => ({ ...prev, minimum: parseFloat(event.target.value) }));
                        }}
                    />
                </div>
                <div>
                    <label className="block mb-2">Maximum Rate</label>
                    <Input
                        aria-label="Maximum Rate"
                        value={rates.maximum}
                        onChange={(event) => {
                            setRates(prev => ({ ...prev, maximum: parseFloat(event.target.value) }));
                        }}
                    />
                </div>
                <Button onClick={updateRate}>Update Rate</Button>
            </div>
        </PageWrapper>
    );
}

export default RatesPage;