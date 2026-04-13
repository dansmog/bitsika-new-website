"use client";

export const Loader = () => {
  return (
    <div className="flex items-center justify-center">
      <div
        style={{
          borderColor: 'rgba(37,99,235, 0.2)',
          borderTopColor: '#2564eb',
        }}
        className="inline-block border-4 rounded-full animate-spin w-8 h-8"
        role="spinbutton"
      />
    </div>
  );
};
