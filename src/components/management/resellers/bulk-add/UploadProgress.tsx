import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Reseller, UploadStats, Error } from "./types";
import { createReseller } from "@/actions/users";

interface UploadProgressProps {
  resellers: Reseller[];
  onComplete: (stats: UploadStats) => void;
}

const UploadProgress: React.FC<UploadProgressProps> = ({
  resellers,
  onComplete,
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [errors, setErrors] = useState<Error[]>([]);
  const [successCount, setSuccessCount] = useState(0);

  const startUpload = async () => {
    setIsUploading(true);
    setProgress(0);
    setCurrentIndex(0);
    setErrors([]);
    setSuccessCount(0);

    const newErrors: Error[] = [];
    let newSuccessCount = 0;

    for (let i = 0; i < resellers.length; i++) {
      try {
        await createReseller({
          firstName: resellers[i].firstName.trim(),
          lastName: resellers[i].lastName.trim(),
          dob: resellers[i].dob.trim(),
          address: resellers[i].address.trim(),
          businessName: resellers[i].businessName.trim(),
          email: resellers[i].email.trim(),
          gender: resellers[i].gender.toLowerCase().trim() as "male" | "female",
          phone: String(resellers[i].phone).trim(),
          cohort: Number(String(resellers[i].cohort).trim()) || 1,
        });
        newSuccessCount++;
      } catch (error: any) {
        newErrors.push({
          email: resellers[i].email,
          error: error.message,
        });
      }

      setCurrentIndex(i + 1);
      setProgress(((i + 1) / resellers.length) * 100);
    }

    // Update states with collected values
    setSuccessCount(newSuccessCount);
    setErrors(newErrors);
    setIsUploading(false);

    // Pass final values directly instead of from state
    onComplete({
      total: resellers.length,
      successful: newSuccessCount,
      failed: newErrors.length,
      errors: newErrors, // Pass the errors array too
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Button
          onClick={startUpload}
          disabled={isUploading}
          className="w-full mb-4"
        >
          {isUploading ? "Uploading..." : "Start Bulk Upload"}
        </Button>
      </div>

      {isUploading && (
        <div className="space-y-2">
          <Progress value={progress} />
          <p className="text-sm text-gray-600">
            Processing: {currentIndex} of {resellers.length} resellers (
            {Math.round(progress)}%)
          </p>
          <p className="text-sm text-primary">
            Successfully uploaded: {successCount}
          </p>
          <p className="text-sm text-red-600">
            Failed uploads: {errors.length}
          </p>
        </div>
      )}

      {errors.length > 0 && (
        <div className="mt-4 space-y-2">
          <Alert variant="destructive">
            <AlertDescription>
              <div className="text-sm font-medium">Failed Uploads:</div>
              <ul className="mt-2 text-sm">
                {errors.map((error, index) => (
                  <li key={index} className="mt-1">
                    {error.email}: {error.error}
                  </li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
        </div>
      )}
    </div>
  );
};

export default UploadProgress;
