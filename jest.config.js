module.exports = {
    roots: ["<rootDir>/test"],
    collectCoverageFrom: ["<rootDir>/test/**/*.ts"],
    coverageDirectory: "coverage",
    testEnvironment: "node",
    transform: {
        ".+\\.ts$": "ts-jest",
    },
    moduleNameMapper: {
        "@/(.*)": "<rootDir>/src/$1",
    },
}