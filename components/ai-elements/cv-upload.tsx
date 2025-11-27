"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Upload, FileText, AlertCircle, CheckCircle2 } from "lucide-react";

interface CVUploadProps {
  onUpload: (file: File) => void;
  isLoading?: boolean;
}

export function CVUpload({ onUpload, isLoading = false }: CVUploadProps) {
  const [isDragActive, setIsDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleValidation = (file: File): boolean => {
    const validTypes = ["application/pdf", "image/jpeg", "image/png", "image/jpg"];
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (!validTypes.includes(file.type)) {
      setError("Please upload a PDF or image file (JPG, PNG)");
      return false;
    }

    if (file.size > maxSize) {
      setError("File size must be less than 10MB");
      return false;
    }

    setError("");
    return true;
  };

  const handleFile = (file: File) => {
    if (handleValidation(file)) {
      setSelectedFile(file);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  };

  const handleSubmit = () => {
    if (selectedFile) {
      onUpload(selectedFile);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto animate-in fade-in-0 slide-in-from-bottom-2 duration-300">
      <div className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-xl border border-slate-700/30 rounded-2xl p-8 shadow-[0_8px_32px_0_rgba(15,23,42,0.3)]">
        {/* Header */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-slate-100 mb-1">
            Upload Your CV
          </h3>
          <p className="text-sm text-slate-400">
            Share your resume to get personalized interview questions
          </p>
        </div>

        {/* Upload Area */}
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`relative border-2 border-dashed rounded-xl p-8 transition-all duration-300 cursor-pointer ${
            isDragActive
              ? "border-sky-400/60 bg-sky-400/10"
              : "border-slate-600/50 bg-slate-700/20 hover:border-slate-500/50 hover:bg-slate-700/30"
          }`}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleChange}
            className="hidden"
            disabled={isLoading}
          />

          <div className="flex flex-col items-center gap-3">
            {selectedFile ? (
              <>
                <div className="p-3 rounded-lg bg-emerald-400/20">
                  <CheckCircle2 className="size-6 text-emerald-400" />
                </div>
                <div className="text-center">
                  <p className="font-semibold text-emerald-300">
                    {selectedFile.name}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="p-3 rounded-lg bg-sky-400/20">
                  <Upload className="size-6 text-sky-400" />
                </div>
                <div className="text-center">
                  <p className="font-semibold text-slate-100">
                    Drop your CV here or click to browse
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    PDF or image files (JPG, PNG) up to 10MB
                  </p>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mt-4 p-3 bg-red-500/10 border border-red-400/30 rounded-lg flex items-start gap-2">
            <AlertCircle className="size-4 text-red-400 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-red-300">{error}</p>
          </div>
        )}

        {/* Submit Button */}
        <div className="mt-6 flex gap-3">
          <Button
            onClick={handleSubmit}
            disabled={!selectedFile || isLoading}
            className={`flex-1 h-10 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
              selectedFile && !isLoading
                ? "bg-gradient-to-r from-sky-400 to-sky-500 hover:from-sky-500 hover:to-sky-600 text-white shadow-[0_0_20px_rgba(56,189,248,0.4)] hover:shadow-[0_0_30px_rgba(56,189,248,0.6)]"
                : "bg-slate-700/30 text-slate-400 cursor-not-allowed"
            }`}
          >
            <FileText className="size-4" />
            {isLoading ? "Uploading..." : "Upload CV"}
          </Button>
        </div>

        {/* Info */}
        <div className="mt-4 p-3 bg-sky-400/10 border border-sky-400/20 rounded-lg">
          <p className="text-xs text-sky-300">
            ✨ Your CV will be analyzed to provide domain-specific interview questions
          </p>
        </div>
      </div>
    </div>
  );
}
